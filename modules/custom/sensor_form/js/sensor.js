/* To compress the javascript file, use https://jscompress.com with the 
 * ECMAScript 2018 checkbox checked.
 *
 * ProbeFloatKit.js contains a database in JSON of Veeder-Root probe and float
 * data. A set of menu in HTML is used with onclick requests into the js code
 * to control the selection of probes and floats. Each menu selection further
 * reduces the selected sensors. At the end of the menu selection
 * process there should be 1 probe and 1 float selected. The user can then
 * click on links to the data sheets on each of the products with details 
 * including part nummbers for ordering.
 *
 * The intial menu selection is the product type (gasoline, diesel, etc.)
 * which helps significantly reduce the available products that meet the need.
*/

var debugFlag = 'off';  // 'on'=turns debugging anything else off
var __sensorVersion = 'Sensor Version: 0.1.0'; // added to track version being sent to Blue Text

  /* As the user makes menu selections, the menu selection is 
   * stored in menuSelections. Each entry in the array is associated
   * with a selection menu box.
   * Store the click selection value from each menu selection level
   * (e.g. grpGasoline, prdGasoline, tnktypUST, etc).
   * This is needed for when a user moves to a menu that has already
   * been selected so that we can reselect probes and floats from the
   * JSON data.
   *
   * [0]=Product Group    [1]=Product           [2]=Usage
   * [3]=Vacuum           [4]=Discriminating    [5]=Position Sensitive
   * [6]=Level Sensing    [7]=Static Testing    [8]=Hydrostatic
   * [9]=Solid State      [10]=Leak Detection   [11]=Tank Type
   * [12]=Points          [13]=Sensor Length    [14]=Cable Length
   * [15]=Tanks           [16]=Pipes
  */
var menuSelections = ["grpGasoline", "empty", "empty", "empty", "empty",
                      "empty", "empty", "empty", "empty", "empty", "empty",
                      "empty", "empty", "empty", "empty", "empty", "empty"];

// prevMenu is used to track what the last menu group was. The menus
// should be selected in order. If they are not, the menus that follow
// should be cleared until the user reaches that menu group.
var prevMenu = "";

// activeMenuList contains the selected menu item or if there is only one
// item in a list; that item.
var activeMenuList = ["empty"];

// menus contains a JSON structure which defines the menu structure for 
// the Probes & Floats javascript code. menus is converted to menusObj.
var menus=`[{
  "dlNumber":1,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldProductGroup",
  "dlName":"Product Group",
  "dlSelectList":"__htmlsnsrProductGroup",
  "dlList":[
    {"ddSelectionId":"productGroup",
     "ddProductGroupItems": [
      {"ddItem":"Aviation", "selected":false, "value":"grpAviation", "grayed":false},
      {"ddItem":"Alternative Fluids", "selected":false, "value":"grpAlternative", "grayed":false},
      {"ddItem":"Diesel", "selected":false, "value":"grpDiesel", "grayed":false},
      {"ddItem":"Gasoline", "selected":true, "value":"grpGasoline", "grayed":false},
      {"ddItem":"Light Oil", "selected":false, "value":"grpLightOil", "grayed":false}
     ]
    }
  ]
  },
  {
  "dlNumber":2,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldProduct",
  "dlName":"Product",
   "dlSelectList":"__htmlsnsrProduct",
  "dlList":[
    {"ddSelectionId":"grpAviation",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"avtypSelect", "grayed":true},
      {"ddItem":"Jet Fuel (incl JP8)", "selected":false, "value":"avJP8", "grayed":false},
      {"ddItem":"Jet Fuel (JP 10)", "selected":false, "value":"avJP10", "grayed":false}
     ]
    },
    {"ddSelectionId":"grpAlternative",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"aftypSelect", "grayed":true},
      {"ddItem":"Ethanol E15", "selected":false, "value":"afEthanolE15", "grayed":false},
      {"ddItem":"Ethanol E85", "selected":false, "value":"afEthanolE85", "grayed":false},
      {"ddItem":"Ethanol E100", "selected":false, "value":"afEthanolE100", "grayed":false},
      {"ddItem":"DEF (AdBlue)", "selected":false, "value":"afDEF", "grayed":false}
     ]
    },
    {"ddSelectionId":"grpDiesel",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"dstypSelect", "grayed":true},
      {"ddItem":"Bio Diesel (B-20)", "selected":false, "value":"dsBiodiesel20", "grayed":false},
      {"ddItem":"Bio Diesel (B-100)", "selected":false, "value":"dsBiodiesel100", "grayed":false},
      {"ddItem":"Diesel (Fuel Oil #2)", "selected":false, "value":"dsDiesel", "grayed":false},
      {"ddItem":"Renewable Diesel (Green)", "selected":false, "value":"dsRenewDiesel", "grayed":false},
      {"ddItem":"Kerosene (Fuel Oil #1)", "selected":false, "value":"dsKerosene", "grayed":false}
     ]
    },
    {"ddSelectionId":"grpGasoline",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"gstypSelect", "grayed":true},
      {"ddItem":"Aviation Gasoline", "selected":false, "value":"gsAviation", "grayed":false},
      {"ddItem":"Leaded Gasoline", "selected":false, "value":"gsLeaded", "grayed":false},
      {"ddItem":"Premium Unleaded Gasoline", "selected":false, "value":"gsPremium", "grayed":false},
      {"ddItem":"Regular Unleaded", "selected":false, "value":"gsRegular", "grayed":false}
     ]
    },
    {"ddSelectionId":"grpLightOil",
     "ddProductGroupItems": [
     {"ddItem":"--Please Select--", "selected":true, "value":"lotypSelect", "grayed":true},
     {"ddItem":"Waste Oil", "selected":false, "value":"loWasoil", "grayed":false},
     {"ddItem":"Motor Oil", "selected":false, "value":"loMotoil", "grayed":false}
     ]
    }
  ]
  },
  {
  "dlNumber":3,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldUsage",
  "dlName":"Usage",
  "dlSelectList":"__htmlsnsrUsage",
  "dlList":[
    {"ddSelectionId":"usage",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"usgSelect", "grayed":true},
      {"ddItem":"Dispenser Pan", "selected":false, "value":"usgDisPan", "grayed":false},
      {"ddItem":"Spill Containment", "selected":false, "value":"usgSpillPan", "grayed":false},
      {"ddItem":"STP Sump", "selected":false, "value":"usgSTP", "grayed":false},
      {"ddItem":"Tank Annular", "selected":false, "value":"usgTankAnl", "grayed":false},
      {"ddItem":"STP Annular", "selected":false, "value":"usgStpAnl", "grayed":false},
      {"ddItem":"Dispenser Pan Annular", "selected":false, "value":"usgDisPanAnl", "grayed":false},
      {"ddItem":"Monitoring Well", "selected":false, "value":"usgMonWell", "grayed":false},
      {"ddItem":"Standalone Dispenser Pan", "selected":false, "value":"usgStndaln", "grayed":false},
      {"ddItem":"Convault Tank", "selected":false, "value":"usgCnvlt", "grayed":false},
      {"ddItem":"Oil Water Seperator", "selected":false, "value":"usgOilWtrSep", "grayed":false}
     ]
    }
  ]
  },
  {
    "dlNumber":4,
    "dlType":"dropdown",
    "dlFieldName":"__htmlfldVacuum",
    "dlName":"Vacuum",
    "dlSelectList":"__htmlsnsrVacuum",
    "dlList":[
      {"ddSelectionId":"vacuum",
       "ddProductGroupItems": [
        {"ddItem":"--Please Select--", "selected":true, "value":"vacSelect", "grayed":true},
        {"ddItem":"Vacuum Solution Needed", "selected":false, "value":"vacYes", "grayed":false},
        {"ddItem":"Vacuum Solution Not Needed", "selected":false, "value":"vacNo", "grayed":false}
       ]
      }
    ]
    },  {
    "dlNumber":5,
    "dlType":"dropdown",
    "dlFieldName":"__htmlfldDiscriminating",
    "dlName":"Discriminating",
    "dlSelectList":"__htmlsnsrDiscriminating",
    "dlList":[
      {"ddSelectionId":"discriminating",
       "ddProductGroupItems": [
        {"ddItem":"--Please Select--", "selected":true, "value":"disSelect", "grayed":true},
        {"ddItem":"Yes", "selected":false, "value":"disYes", "grayed":false},
        {"ddItem":"No", "selected":false, "value":"disNo", "grayed":false}
         ]
      }
    ]
    },
    {
  "dlNumber":6,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldPositionSensitive",
  "dlName":"Position Sensitive",
  "dlSelectList":"__htmlsnsrPositionSensitive",
  "dlList":[
    {"ddSelectionId":"positionSensitive",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"psSelect", "grayed":true},
      {"ddItem":"Yes", "selected":false, "value":"psYes", "grayed":false},
      {"ddItem":"No", "selected":false, "value":"psNo", "grayed":false}
   ]
    }
  ]
  },
  {
    "dlNumber":7,
    "dlType":"dropdown",
    "dlFieldName":"__htmlfldLevelSensing",
    "dlName":"Level Sensing",
    "dlSelectList":"__htmlsnsrLevelSensing",
    "dlList":[
      {"ddSelectionId":"levelSensing",
       "ddProductGroupItems": [
        {"ddItem":"--Please Select--", "selected":true, "value":"lsSelect", "grayed":true},
        {"ddItem":"Yes", "selected":false, "value":"lsYes", "grayed":false},
        {"ddItem":"No", "selected":false, "value":"lsNo", "grayed":false}
         ]
      }
    ]
    },
    {
  "dlNumber":8,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldStaticTesting",
  "dlName":"Static Testing",
  "dlSelectList":"__htmlsnsrStaticTesting",
  "dlList":[
    {"ddSelectionId":"staticTesting",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"stSelect", "grayed":true},
      {"ddItem":"Yes", "selected":false, "value":"stYes", "grayed":false},
      {"ddItem":"No", "selected":false, "value":"stNo", "grayed":false}
     ]
    }
  ]
  },
{
  "dlNumber":9,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldHydrostatic",
  "dlName":"Hydro-Static",
  "dlSelectList":"__htmlsnsrHydrostatic",
  "dlList":[
    {"ddSelectionId":"hydroStatic",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"hsSelect", "grayed":true},
      {"ddItem":"Yes", "selected":false, "value":"hsYes", "grayed":false},
      {"ddItem":"No", "selected":false, "value":"hsNo", "grayed":false}
     ]
    }
  ]
  },
{
  "dlNumber":10,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldSolidState",
  "dlName":"Solid State",
  "dlSelectList":"__htmlsnsrSolidState",
  "dlList":[
    {"ddSelectionId":"solidState",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"ssSelect", "grayed":true},
      {"ddItem":"Yes", "selected":false, "value":"ssYes", "grayed":false},
      {"ddItem":"No", "selected":false, "value":"ssNo", "grayed":false}
     ]
    }
  ]
  },
  {
    "dlNumber":11,
    "dlType":"dropdown",
    "dlFieldName":"__htmlfldLeakDetection",
    "dlName":"Leak Detection",
    "dlSelectList":"__htmlsnsrLeakDetection",
    "dlList":[
      {"ddSelectionId":"leakDetection",
       "ddProductGroupItems": [
        {"ddItem":"--Please Select--", "selected":true, "value":"ldSelect", "grayed":true},
        {"ddItem":"Leak Detection", "selected":false, "value":"ldYes", "grayed":false},
        {"ddItem":"No Leak Detection", "selected":false, "value":"ldNo", "grayed":false}
       ]
      }
    ]
    },
  {
    "dlNumber":12,
    "dlType":"dropdown",
    "dlFieldName":"__htmlfldTankType",
    "dlName":"Tank Type",
    "dlSelectList":"__htmlsnsrTankType",
    "dlList":[
      {"ddSelectionId":"tankType",
        "ddProductGroupItems": [
        {"ddItem":"--Please Select--", "selected":true, "value":"tnkSelect", "grayed":true},
        {"ddItem":"No Tank", "selected":false, "value":"tnkNone", "grayed":false},
        {"ddItem":"Brine Filled", "selected":false, "value":"tnkBrine", "grayed":false},
        {"ddItem":"Fiberglass", "selected":false, "value":"tnkFiber", "grayed":false},
        {"ddItem":"Steel", "selected":false, "value":"tnkSteel", "grayed":false},
        {"ddItem":"-- Ignored --", "selected":false, "value":"tnkEmpty", "grayed":false}
        ]
      }
    ]
  },
  {
    "dlNumber":13,
    "dlType":"dropdown",
    "dlFieldName":"__htmlfldPoints",
    "dlName":"Points",
    "dlSelectList":"__htmlsnsrPoints",
    "dlList":[
      {"ddSelectionId":"points",
        "ddProductGroupItems": [
        {"ddItem":"--Please Select--", "selected":true, "value":"ptSelect", "grayed":true},
        {"ddItem":"No Tank", "selected":false, "value":"ptNone", "grayed":false},
        {"ddItem":"Dual", "selected":false, "value":"ptDual", "grayed":false},
        {"ddItem":"Single", "selected":false, "value":"ptSingle", "grayed":false}
        ]
      }
    ]
  },
  {
    "dlNumber":14,
    "dlType":"dropdown",
    "dlFieldName":"__htmlfldSensorLength",
    "dlName":"Sensor Length",
    "dlSelectList":"__htmlsnsrSensorLength",
    "dlList":[
      {"ddSelectionId":"sensorLength",
       "ddProductGroupItems": [
        {"ddItem":"--Please Select--", "selected":true, "value":"senSelect", "grayed":true},
        {"ddItem":"2.0 Inches", "selected":false, "value":"sen20", "grayed":false},
        {"ddItem":"2.2 Inches", "selected":false, "value":"sen22", "grayed":false},
        {"ddItem":"2.5 Inches", "selected":false, "value":"sen25", "grayed":false},
        {"ddItem":"3.5 Inches", "selected":false, "value":"sen35", "grayed":false},
        {"ddItem":"4.3 Inches", "selected":false, "value":"sen43", "grayed":false},
        {"ddItem":"4.9 Inches", "selected":false, "value":"sen49", "grayed":false},
        {"ddItem":"6.0 Inches", "selected":false, "value":"sen6", "grayed":false},
        {"ddItem":"11.6 Inches", "selected":false, "value":"sen116", "grayed":false},
        {"ddItem":"12.0 Inches", "selected":false, "value":"sen120", "grayed":false},
        {"ddItem":"17.3 Inches", "selected":false, "value":"sen173", "grayed":false},
        {"ddItem":"21.4 Inches", "selected":false, "value":"sen214", "grayed":false},
        {"ddItem":"22.1 Inches", "selected":false, "value":"sen221", "grayed":false},
        {"ddItem":"24 Inches", "selected":false, "value":"sen24", "grayed":false},
        {"ddItem":"33.4 Inches", "selected":false, "value":"sen334", "grayed":false},
        {"ddItem":"Customized", "selected":false, "value":"senCst", "grayed":false}
      ]
    }
  ]
  },
  {
  "dlNumber":15,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldCableLength",
  "dlName":"Cable Length",
  "dlSelectList":"__htmlsnsrCableLength",
  "dlList":[
    {"ddSelectionId":"cableLength",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"cblSelect", "grayed":true},
      {"ddItem":"5 ft", "selected":false, "value":"cbl5", "grayed":false},
      {"ddItem":"8 ft", "selected":false, "value":"cbl8", "grayed":false},
      {"ddItem":"10 ft", "selected":false, "value":"cbl10", "grayed":false},
      {"ddItem":"12 ft", "selected":false, "value":"cbl12", "grayed":false},
      {"ddItem":"15 ft", "selected":false, "value":"cbl15", "grayed":false},
      {"ddItem":"16 ft", "selected":false, "value":"cbl16", "grayed":false},
      {"ddItem":"18 ft", "selected":false, "value":"cbl18", "grayed":false},
      {"ddItem":"20 ft", "selected":false, "value":"cbl20", "grayed":false},
      {"ddItem":"25 ft", "selected":false, "value":"cbl25", "grayed":false},
      {"ddItem":"30 ft", "selected":false, "value":"cbl30", "grayed":false},  
      {"ddItem":"64 Inches", "selected":false, "value":"cbl64i", "grayed":false}
     ]
    }
  ]
  },
  {
  "dlNumber":16,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldTanks",
  "dlName":"Tanks",
  "dlSelectList":"__htmlsnsrTanks",
  "dlList":[
    {"ddSelectionId":"tanks",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"tnkSelect", "grayed":true},
      {"ddItem":"No Tanks", "selected":false, "value":"tnkNone", "grayed":false},
      {"ddItem":"One Tank", "selected":false, "value":"tnk1", "grayed":false}
     ]
    }
  ]
  },
  {
  "dlNumber":17,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldPipes",
  "dlName":"Pipes",
  "dlSelectList":"__htmlsnsrPipes",
  "dlList":[
    {"ddSelectionId":"pipes",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"pipeSelect", "grayed":true},
      {"ddItem":"No Pipelines / Sumps", "selected":false, "value":"pipeNone", "grayed":false},
      {"ddItem":"1 Pipeline / Sump", "selected":false, "value":"pipe1", "grayed":false},
      {"ddItem":"2 Pipelines / Sumps", "selected":false, "value":"pipe2", "grayed":false},
      {"ddItem":"3 Pipelines / Sumps", "selected":false, "value":"pipe3", "grayed":false},
      {"ddItem":"4 Pipelines / Sumps", "selected":false, "value":"pipe4", "grayed":false}
     ]
    }
  ]
  }
]`;

/* probeData is compressed JSON file generated from an excel csv file and 
 * converted to JSON using the web site
 *       http://www.convertcsv.com/csv-to-json.htm.
 * The generated json is compressed using the web site
 *       https://codebeautify.org/jsonminifier.
 * The JSON data is converted to a JS object below.
 */
var sensorData=`[{"sensorId":1,"active":false,"partItemDesc":"Discriminating Dispenser Pan Sensor","pNum":"794380-322","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"330020-012"},{"pNum":"--"}],"sensorLength":"11.6in","cableLength":"12ft","approvals":"ul","discriminating":true,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":true,"spill":true,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":true,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Interstitial/Liquid Sensor Interface Module (P/N 329358-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":2,"active":false,"partItemDesc":"Discriminating Containment Sump Sensor","pNum":"794380-352","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"330020-012"},{"pNum":"--"}],"sensorLength":"22.1in","cableLength":"12ft","approvals":"ul","discriminating":true,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":true,"stp":true,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":true,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Interstitial/Liquid Sensor Interface Module (P/N 329358-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":3,"active":false,"partItemDesc":"Solid-State Discriminating Dispenser Pan Sensor","pNum":"794380-320","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"330020-012"},{"pNum":"--"}],"sensorLength":"11.6in","cableLength":"12ft","approvals":"ul","discriminating":true,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":true,"spill":true,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":true,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Six-Input Type B Sensor Interface Module (P/N 329950-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":4,"active":false,"partItemDesc":"Solid-State Discriminating Containment Sump Sensor","pNum":"794380-350","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"330020-012"},{"pNum":"--"}],"sensorLength":"22.1in","cableLength":"12ft","approvals":"ul","discriminating":true,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":true,"stp":true,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":true,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Six-Input Type B Sensor Interface Module (P/N 329950-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":5,"active":false,"partItemDesc":"Solid-State Dispenser Pan Sensor","pNum":"794380-321","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"330020-012"},{"pNum":"--"}],"sensorLength":"11.6in","cableLength":"12ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":true,"spill":true,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":true,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Type A Sensor Interface Module (P/N 329956-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":6,"active":false,"partItemDesc":"Solid-State Containment Sump Sensor","pNum":"794380-351","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"330020-012"},{"pNum":"--"}],"sensorLength":"22.1in","cableLength":"12ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":true,"stp":true,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":true,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Type A Sensor Interface Module (P/N 329956-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":7,"active":false,"partItemDesc":"Sump Sensor - 12' Cable","pNum":"794380-208","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"330020-012"},{"pNum":"--"}],"sensorLength":"12.0in","cableLength":"12ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":true,"spill":true,"stp":true,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Interstitial/Liquid Sensor Interface Module (P/N 329358-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":8,"active":false,"partItemDesc":"Sump Sensor - 30' Cable","pNum":"794380-209","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"330020-012"},{"pNum":"--"}],"sensorLength":"12.0in","cableLength":"30ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":true,"spill":true,"stp":true,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Interstitial/Liquid Sensor Interface Module (P/N 329358-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":9,"active":false,"partItemDesc":"Position Sensitive Pan/Sump Sensor - 12' Cable","pNum":"794380-323","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"330020-012"},{"pNum":"--"}],"sensorLength":"12.0in","cableLength":"12ft","approvals":"ul","discriminating":false,"positionSensitive":true,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":true,"spill":true,"stp":true,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":true,"afEthanolE100":true,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Interstitial/Liquid Sensor Interface Module (P/N 329358-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":10,"active":false,"partItemDesc":"Solid-State Discriminating Interstitial Sensor for Fiberglass Tanks (4'-10' Tank I.D.) with 25' Cable","pNum":"794380-343","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"330020-436"}],"sensorLength":"4.3in","cableLength":"25ft","approvals":"ul","discriminating":true,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":false,"tankType":"Fiberglass","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":true},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":true,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":true,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Type A Sensor Interface Module (P/N 329956-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"--","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":11,"active":false,"partItemDesc":"Interstitial Sensor for up to 12' internal tank diameters","pNum":"794390-409","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"330020-436"}],"sensorLength":"2.2in","cableLength":"25ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"Fiberglass","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":true},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Interstitial/Liquid Sensor Interface Module (P/N 329358-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":12,"active":false,"partItemDesc":"Solid-State Interstitial Sensor for Fiberglass Tanks (4'-10' Tank I.D.) with 25' Cable","pNum":"794380-345","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"330020-436"}],"sensorLength":"4.3in","cableLength":"25ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":false,"tankType":"Fiberglass","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":true},"prd":{"afEthanolE15":true,"afEthanolE85":true,"afEthanolE100":true,"afDEF":true,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":true,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Type A Sensor Interface Module (P/N 329956-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":13,"active":false,"partItemDesc":"Interstitial Sensor for Steel Tanks (4'-12' Tank I.D.) with 16' Cable","pNum":"794390-420","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"330020-436"}],"sensorLength":"2.5in","cableLength":"16ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"Steel","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":true},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Interstitial/Liquid Sensor Interface Module (P/N 329358-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":14,"active":false,"partItemDesc":"Interstitial Sensor for Steel Tanks (4'-12' Tank I.D.) with 30' Cable","pNum":"794390-460","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"330020-436"}],"sensorLength":"2.5in","cableLength":"30ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"Steel","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":true},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Interstitial/Liquid Sensor Interface Module (P/N 329358-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":15,"active":false,"partItemDesc":"Position Sensitive Interstitial Sensor for Steel Tanks with 15' Cable","pNum":"794380-333","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"3.5in","cableLength":"20ft","approvals":"ul","discriminating":false,"positionSensitive":true,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"Steel","points":"None","usage":{"disPan":false,"spill":true,"stp":false,"tankAnnular":true,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":true,"afEthanolE100":true,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":true,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Interstitial/Liquid Sensor Interface Module (P/N 329358-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":16,"active":false,"partItemDesc":"Interstitial Sensor for Steel Tanks (4'-12' Tank I.D.) with 15' Cable","pNum":"794380-430","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"2.5in","cableLength":"15ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"Steel","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":true},"prd":{"afEthanolE15":true,"afEthanolE85":true,"afEthanolE100":true,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":true,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Interstitial/Liquid Sensor Interface Module (P/N 329358-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":17,"active":false,"partItemDesc":"MicroSensor (for small, hard to reach locations)","pNum":"794380-344","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"330020-436"}],"sensorLength":"2.0in","cableLength":"25ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":false,"tankType":"Steel","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":true,"disPanAnnular":true,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":true},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":true,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":true,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Type A Sensor Interface Module (P/N 329956-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":18,"active":false,"partItemDesc":"Dual-Point Hydrostatic Sensor with Vented Locking Riser Cap","pNum":"794380-303","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"--"},{"pNum":"--"}],"sensorLength":"17.3in","cableLength":"12ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":true,"solidState":false,"leakDetection":false,"tankType":"--","points":"Dual","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":true},"prd":{"afEthanolE15":true,"afEthanolE85":true,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Interstitial/Liquid Sensor Interface Module (P/N 329358-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":19,"active":false,"partItemDesc":"Single-Point Hydrostatic Sensor with Vented Locking Riser Cap","pNum":"794380-301","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"--"},{"pNum":"--"}],"sensorLength":"6.0in","cableLength":"12ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":true,"solidState":false,"leakDetection":false,"tankType":"--","points":"Single","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":true},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Interstitial/Liquid Sensor Interface Module (P/N 329358-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":20,"active":false,"partItemDesc":"Single-Point Mini-Hydrostatic Sensor","pNum":"794380-304","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"--"},{"pNum":"--"}],"sensorLength":"2.5in","cableLength":"8ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":true,"solidState":false,"leakDetection":false,"tankType":"--","points":"Single","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":true,"disPanAnnular":true,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":true,"afEthanolE100":true,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":true,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Interstitial/Liquid Sensor Interface Module (P/N 329358-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":21,"active":false,"partItemDesc":"Vapor Sensor","pNum":"794390-700","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"--"},{"pNum":"--"}],"sensorLength":"4.9in","cableLength":"18ft","approvals":"ul","discriminating":true,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":true,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Five-Input Vapor Sensor Interface Module (P/N 329357-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":22,"active":false,"partItemDesc":"Groundwater Sensor for 7' to 10' well depths","pNum":"794380-621","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-939"},{"pNum":"--"}],"sensorLength":"24in","cableLength":"10ft","approvals":"ul","discriminating":true,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":true,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Five-Input Groundwater Sensor Interface Module (P/N 329399-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":23,"active":false,"partItemDesc":"Groundwater Sensor for 10' to 15' well depths","pNum":"794380-622","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-939"},{"pNum":"--"}],"sensorLength":"24in","cableLength":"15ft","approvals":"ul","discriminating":true,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":true,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Five-Input Groundwater Sensor Interface Module (P/N 329399-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":24,"active":false,"partItemDesc":"Groundwater Sensor for 15 to 20ft well depths","pNum":"794380-624","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-939"},{"pNum":"--"}],"sensorLength":"24in","cableLength":"20ft","approvals":"ul","discriminating":true,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":true,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Five-Input Groundwater Sensor Interface Module (P/N 329399-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":25,"active":false,"partItemDesc":"Oil Water Separator Sensor (OWSS) with 5' Cable","pNum":"794690-XXX","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"--"},{"pNum":"--"}],"sensorLength":"Customized","cableLength":"12ft","approvals":"ul","discriminating":true,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":true,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"wired"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"wired"},{"gauge":"tls350","software":"15 or Higher","interface":"Eight-Input Interstitial/Liquid Sensor Interface Module (P/N 329358-001)","connect":"wired"},{"gauge":"tls300i","software":"15 or Higher","interface":"Module, 4 Probe/8 Sensor, TLS-300i (P/N-330230-001 )","connect":"wired"},{"gauge":"tls300c","software":"15 or Higher","interface":"Module, 2 Probe 8 Sensor Options, TLS-300C (P/N 330513-001 )","connect":"wired"}]},{"sensorId":26,"active":false,"partItemDesc":"Single-Float Non-Discriminating Stand-Alone Dispenser Pan Sensor with Dispenser Control Interface, UL","pNum":"847990-001","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"11.6in","cableLength":"5ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":true,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":27,"active":false,"partItemDesc":"Single-Float Discriminating Stand-Alone Dispenser Pan Sensor with Dispenser Control Interface, UL","pNum":"847990-002","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"11.6in","cableLength":"5ft","approvals":"ul","discriminating":true,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":true,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":28,"active":false,"partItemDesc":"Single-Float Non-Discriminating Stand-Alone Dispenser Pan Sensor with Dispenser Control Interface, cUL","pNum":"847970-001","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"11.6in","cableLength":"5ft","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":true,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":29,"active":false,"partItemDesc":"Single-Float Discriminating Stand-Alone Dispenser Pan Sensor with Dispenser Control Interface, cUL","pNum":"847970-002","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"11.6in","cableLength":"5ft","approvals":"ul","discriminating":true,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":true,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":true,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":30,"active":false,"partItemDesc":"Mag Pan/Sump Sensor for Gas & Diesel, 12\\\" - UL","pNum":"857080-111","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"21.4in","cableLength":"10ft","approvals":"ul","discriminating":true,"positionSensitive":true,"levelSensing":true,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":true,"spill":true,"stp":true,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":true,"afEthanolE100":true,"afDEF":true,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":true,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"both"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"both"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"both"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"both"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":31,"active":false,"partItemDesc":"Mag Pan/Sump Sensor for Gas & Diesel, 24\\\" - UL","pNum":"857080-112","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"33.4in","cableLength":"10ft","approvals":"ul","discriminating":true,"positionSensitive":true,"levelSensing":true,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":true,"spill":true,"stp":true,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":true,"afEthanolE100":true,"afDEF":true,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":true,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"both"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"both"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"both"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"both"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":32,"active":false,"partItemDesc":"Mag Pan/Sump Sensor with leak detection for Gas & Diesel, 12\\\" - UL*","pNum":"857080-211","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"21.4in","cableLength":"10ft","approvals":"ul","discriminating":true,"positionSensitive":true,"levelSensing":true,"staticTest":true,"hydroStatic":false,"solidState":false,"leakDetection":true,"tankType":"--","points":"None","usage":{"disPan":true,"spill":true,"stp":true,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":true,"afEthanolE100":true,"afDEF":true,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":true,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"both"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"both"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"both"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"both"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":33,"active":false,"partItemDesc":"Mag Pan/Sump Sensor with leak detection for Gas & Diesel, 24\\\" - UL*","pNum":"857080-212","technology":"nonVacuum","tanks":"--","pipes":"--","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"33.4in","cableLength":"10ft","approvals":"ul","discriminating":true,"positionSensitive":true,"levelSensing":true,"staticTest":true,"hydroStatic":false,"solidState":false,"leakDetection":true,"tankType":"--","points":"None","usage":{"disPan":true,"spill":true,"stp":true,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":true,"afEthanolE85":true,"afEthanolE100":true,"afDEF":true,"avJP8":true,"avJP10":true,"dsBiodiesel20":true,"dsBiodiesel100":true,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":true,"loWasoil":true},"support":[{"gauge":"tls450PLUS","software":"5A or greater","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"both"},{"gauge":"tls4i","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4i- P/N 330020-750)","connect":"both"},{"gauge":"tls4c","software":"5A or greater","interface":"USIOM Board Replacement Kit, AC (TLS4c- P/N 330020-751)","connect":"both"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"both"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":34,"active":false,"partItemDesc":"Vacuum Sensing System (SCVS) 4 Vacuum Sensor kit, up to 10' dia. fiberglass tanks","pNum":"330020-471","technology":"vacuum","tanks":"1","pipes":"3","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":true,"tankType":"Fiberglass","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":true,"disPanAnnular":true,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"tls450PLUS","software":"8M or Higher","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":35,"active":false,"partItemDesc":"Vacuum Sensing System (SCVS) 4 Vacuum Sensor kit, steel tanks","pNum":"330020-467","technology":"vacuum","tanks":"1","pipes":"3","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":true,"tankType":"Steel","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":true,"disPanAnnular":true,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"tls450PLUS","software":"8M or Higher","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":36,"active":false,"partItemDesc":"Vacuum Sensing System (SCVS) 3 Vacuum Sensor kit, up to 10' dia. fiberglass tanks","pNum":"330020-476","technology":"vacuum","tanks":"1","pipes":"2","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":true,"tankType":"Fiberglass","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":true,"disPanAnnular":true,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"tls450PLUS","software":"8M or Higher","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":37,"active":false,"partItemDesc":"Vacuum Sensing System (SCVS) 3 Vacuum Sensor kit, steel tanks","pNum":"330020-472","technology":"vacuum","tanks":"1","pipes":"2","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":true,"tankType":"Steel","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":true,"disPanAnnular":true,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"tls450PLUS","software":"8M or Higher","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":38,"active":false,"partItemDesc":"Vacuum Sensing System (SCVS) 2 Vacuum Sensor kit, up to 10' dia. fiberglass tanks","pNum":"330020-484","technology":"vacuum","tanks":"1","pipes":"1","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":true,"tankType":"Fiberglass","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":true,"disPanAnnular":true,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"tls450PLUS","software":"8M or Higher","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":39,"active":false,"partItemDesc":"Vacuum Sensing System (SCVS) 2 Vacuum Sensor kit, steel tanks","pNum":"330020-479","technology":"vacuum","tanks":"1","pipes":"1","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":true,"tankType":"Steel","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":true,"disPanAnnular":true,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"tls450PLUS","software":"8M or Higher","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":40,"active":false,"partItemDesc":"Vacuum Sensing System (SCVS) 1 Vacuum Sensor kit, steel tanks","pNum":"330020-549","technology":"vacuum","tanks":"1","pipes":"0","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":true,"tankType":"Fiberglass","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":true,"disPanAnnular":true,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"tls450PLUS","software":"8M or Higher","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":41,"active":false,"partItemDesc":"Vacuum Sensing System (SCVS) 1 Vacuum Sensor kit, up to 10' dia. fiberglass tanks","pNum":"330020-599","technology":"vacuum","tanks":"1","pipes":"0","accessory":[{"pNum":"312020-928"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":true,"tankType":"Steel","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":true,"disPanAnnular":true,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"tls450PLUS","software":"8M or Higher","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":42,"active":false,"partItemDesc":"Vacuum Sensing System (SCVS) 4 Vacuum Sensor kit, no tank - 4 pipes/sumps","pNum":"330020-486","technology":"vacuum","tanks":"0","pipes":"4","accessory":[{"pNum":"--"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":true,"tankType":"None","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":true,"disPanAnnular":true,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"tls450PLUS","software":"8M or Higher","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":43,"active":false,"partItemDesc":"Vacuum Sensing System (SCVS) 3 Vacuum Sensor kit, no tank - 3 pipes/sumps","pNum":"330020-485","technology":"vacuum","tanks":"0","pipes":"3","accessory":[{"pNum":"--"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":true,"tankType":"None","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":true,"disPanAnnular":true,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"tls450PLUS","software":"8M or Higher","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":44,"active":false,"partItemDesc":"Vacuum Sensing System (SCVS) 2 Vacuum Sensor kit, no tank - 2 pipes/sumps","pNum":"330020-480","technology":"vacuum","tanks":"0","pipes":"2","accessory":[{"pNum":"--"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":true,"tankType":"None","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":true,"disPanAnnular":true,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"tls450PLUS","software":"8M or Higher","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":45,"active":false,"partItemDesc":"Vacuum Sensing System (SCVS) 1 Vacuum Sensor kit, no tank - 1 pipe/sump","pNum":"330020-495","technology":"vacuum","tanks":"0","pipes":"1","accessory":[{"pNum":"--"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"ul","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":true,"leakDetection":true,"tankType":"None","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":true,"stpAnnular":true,"disPanAnnular":true,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":true,"dsRenewDiesel":true,"dsKerosene":true,"gsLeaded":true,"gsPremium":true,"gsRegular":true,"gsAviation":true,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"tls450PLUS","software":"8M or Higher","interface":"Sixteen-Input Universal Sensor/Probe Module (P/N 332812-001)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"tls350","software":"24C or Higher","interface":"Eight-Input Smart Sensor Module (P/N 329356-004)","connect":"wired"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":46,"active":false,"partItemDesc":"Universal Installation Mounting Kit for Mag Sump Sensor","pNum":"330020-012","technology":"Accessory","tanks":"--","pipes":"--","accessory":[{"pNum":"--"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"--","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":false,"dsRenewDiesel":false,"dsKerosene":false,"gsLeaded":false,"gsPremium":false,"gsRegular":false,"gsAviation":false,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":47,"active":false,"partItemDesc":"2\\\" Interstitial Sensor Riser Cap and Adaptor Kit","pNum":"312020-928","technology":"Accessory","tanks":"--","pipes":"--","accessory":[{"pNum":"--"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"--","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":false,"dsRenewDiesel":false,"dsKerosene":false,"gsLeaded":false,"gsPremium":false,"gsRegular":false,"gsAviation":false,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":48,"active":false,"partItemDesc":"4\\\" Vapor Sensor Riser Cap and Adaptor Kit for Groundwater Sensors","pNum":"312020-939","technology":"Accessory","tanks":"--","pipes":"--","accessory":[{"pNum":"--"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"--","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":false,"dsRenewDiesel":false,"dsKerosene":false,"gsLeaded":false,"gsPremium":false,"gsRegular":false,"gsAviation":false,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]},{"sensorId":49,"active":false,"partItemDesc":"Fiberglass Interstitial Sensor Installation Kit","pNum":"330020-436","technology":"Accessory","tanks":"--","pipes":"--","accessory":[{"pNum":"--"},{"pNum":"--"}],"sensorLength":"--","cableLength":"--","approvals":"--","discriminating":false,"positionSensitive":false,"levelSensing":false,"staticTest":false,"hydroStatic":false,"solidState":false,"leakDetection":false,"tankType":"--","points":"None","usage":{"disPan":false,"spill":false,"stp":false,"tankAnnular":false,"stpAnnular":false,"disPanAnnular":false,"monWell":false,"oilWaterSep":false,"standalone":false,"convault":false},"prd":{"afEthanolE15":false,"afEthanolE85":false,"afEthanolE100":false,"afDEF":false,"avJP8":false,"avJP10":false,"dsBiodiesel20":false,"dsBiodiesel100":false,"dsDiesel":false,"dsRenewDiesel":false,"dsKerosene":false,"gsLeaded":false,"gsPremium":false,"gsRegular":false,"gsAviation":false,"loMotoil":false,"loWasoil":false},"support":[{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"},{"gauge":"--","software":"--","interface":"--","connect":"--"}]}]`;

  let maxSensors=0;
  let maxAccessory=0;

  let sensorObj = JSON.parse(sensorData);
  console.log(sensorObj);

  let menuObj = JSON.parse(menus);
  console.log(menuObj);

  function getNumberOfSensors() {
    maxSensors=0;
    maxAccessory=0;
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].technology !== "Accessory") {
        maxSensors++;
      }
      else
      {
        maxAccessory++;
      }
    }
  };

  // Clear an HTML field
  function clearSelectList(selectList) {
    while (selectList.firstChild) {
      selectList.removeChild(selectList.firstChild);
    }
  }

  // Set a passed Dropdown list to have one entry "--empty list--".
  function emptySelectList(selectListString) {
    let selectList = document.getElementById(selectListString);
    let option = document.createElement("option");
    option.text = "--empty list--";
    selectList.add(option);
    selectList.disabled = true;
  }

  // Set a passed Dropdown list to have one entry "--empty list--".
  function ignoreSelectList(selectListString) {
    let selectList = document.getElementById(selectListString);
    clearSelectList(selectList);
    let option = document.createElement("option");
    option.text = "-- Ignored --";
    selectList.add(option);
    selectList.disabled = true;
  }

  // The dropdown selection lists appear in order on a page.
  // emptyAllSublists takes an HTML dropdown list name and sets it and
  // all following lists on the page to "--empty list--".
  // The first two dropdown lists are never cleared.
  function emptyAllSublists(startList) {
    // Find records that support the default settings and display the count.
    clearOutput();
    switch (startList) {
      case "__htmlsnsrUsage":
        var x = document.getElementById("__htmlsnsrUsage");
        clearSelectList(x);
        emptySelectList("__htmlsnsrUsage");
      case "__htmlsnsrVacuum":
        var x = document.getElementById("__htmlsnsrVacuum");
        clearSelectList(x);
        emptySelectList("__htmlsnsrVacuum");
      case "__htmlsnsrDiscriminating":
        var x = document.getElementById("__htmlsnsrDiscriminating");
        clearSelectList(x);
        emptySelectList("__htmlsnsrDiscriminating");
      case "__htmlsnsrPositionSensitive":
        var x = document.getElementById("__htmlsnsrPositionSensitive");
        clearSelectList(x);
        emptySelectList("__htmlsnsrPositionSensitive");
      case "__htmlsnsrLevelSensing":
        var x = document.getElementById("__htmlsnsrLevelSensing");
        clearSelectList(x);
        emptySelectList("__htmlsnsrLevelSensing");
      case "__htmlsnsrStaticTesting":
        var x = document.getElementById("__htmlsnsrStaticTesting");
        clearSelectList(x);
        emptySelectList("__htmlsnsrStaticTesting");
      case "__htmlsnsrHydrostatic":
        var x = document.getElementById("__htmlsnsrHydrostatic");
        clearSelectList(x);
        emptySelectList("__htmlsnsrHydrostatic");
      case "__htmlsnsrSolidState":
        var x = document.getElementById("__htmlsnsrSolidState");
        clearSelectList(x);
        emptySelectList("__htmlsnsrSolidState");
        case "__htmlsnsrLeakDetection":
        var x = document.getElementById("__htmlsnsrLeakDetection");
        clearSelectList(x);
        emptySelectList("__htmlsnsrLeakDetection");
      case "__htmlsnsrTankType":
        var x = document.getElementById("__htmlsnsrTankType");
        clearSelectList(x);
        emptySelectList("__htmlsnsrTankType");
      case "__htmlsnsrPoints":
        var x = document.getElementById("__htmlsnsrPoints");
        clearSelectList(x);
        emptySelectList("__htmlsnsrPoints");
      case "__htmlsnsrSensorLength":
        var x = document.getElementById("__htmlsnsrSensorLength");
        clearSelectList(x);
        emptySelectList("__htmlsnsrSensorLength");
      case "__htmlsnsrCableLength":
        var x = document.getElementById("__htmlsnsrCableLength");
        clearSelectList(x);
        emptySelectList("__htmlsnsrCableLength");
      case "__htmlsnsrTanks":
        var x = document.getElementById("__htmlsnsrTanks");
        clearSelectList(x);
        emptySelectList("__htmlsnsrTanks");
      case "__htmlsnsrPipes":
        var x = document.getElementById("__htmlsnsrPipes");
        clearSelectList(x);
        emptySelectList("__htmlsnsrPipes");
    }
  }

    // If a dropdown has one entry, it is disabled (not selectable).
  function disableSelectList(selectListString) {
    let selectList = document.getElementById(selectListString);
    selectList.disabled = true;
  }

  // If a dropdown has more than one entry, it is enabled (selectable).
  // When enabled, the user can select one of the entries.
  function enableSelectList(selectListString) {
    let selectList = document.getElementById(selectListString);
    selectList.disabled = false;
  }

  // As the user selects dropdown entries, keep track of the order in which
  // they are selected. If the user goes to a previously selected menu,
  // the following menus need to be cleared and the remaining dropdown
  // entries that were selected need to be rebuilt. This is controlled by
  // tracking the current and previous menu selections (currMenu,
  // prevMenu)
  function rebuildSelectList(currMenu) {
    // Check if Previous menu selection was right before the current
    // menu selection.  If it was, the selection list is OK, return.
    switch (currMenu) {
      case "productGroup":
        return;
      case "product":
        return;
      case "usage":
        if (prevMenu === "product")
          return;
        break;
      case "vacuum":
        if (prevMenu === "usage")
          return;
        break;
      case "discriminating":
        if (prevMenu === "vacuum")
          return;
        break;
      case "positionSensitive":
        if (prevMenu === "discriminating")
          return;
        break;
      case "levelSensing":
        if (prevMenu === "positionSensitive")
          return;
        break;
      case "staticTesting":
        if (prevMenu === "levelSensing")
          return;
        break;
      case "hydroStatic":
        if (prevMenu === "staticTesting")
          return;
        break;
        case "solidState":
        if (prevMenu === "hydroStatic")
          return;
        break;
      case "leakDetection":
        if (prevMenu === "solidState")
          return;
        break;
      case "tankType":
        if (prevMenu === "leakDetection")
          return;
        break;
      case "points":
        if (prevMenu === "tankType")
          return;
        break;
      case "sensorLength":
        if ((prevMenu === "tankType") || (prevMenu === "leakDetection"))
          return;
        break;
      case "cableLength":
        if (prevMenu === "sensorLength")
          return;
        break;
      case "tanks":
        if (prevMenu === "cableLength")
          return;
        break;
      case "pipes":
        if (prevMenu === "tanks")
          return;
        break;
    }

    // *****
    // Selection out of sequence: Rebuild the selection list for probes

    // Go thru all probes and clear the active (selection) flag
    setAllSensorsInactive();

    // Select sensors to match the product group.
    findSensorByProduct(menuSelections[1]);  // 1=Product

    // The following switch rebuilds the selected sensor list
    // based on the user's previous selections (captured in menuSelections).
    // menuSelection contains the user's previous selections. Use the previous
    // selections to reduce the selected senors by those selections.
    switch (currMenu) { 
      case "usage":
        reduceUsage(menuSelections[2]);
        return;
      case "vacuum":
        reduceUsage(menuSelections[2]);
        reduceVacuum(menuSelections[3]);
        return;
      case "discriminating":
        reduceUsage(menuSelections[2]);
        reduceVacuum(menuSelections[3]);
        reduceDiscriminating(menuSelections[4]);
        return;
      case "positionSensitive":
        reduceUsage(menuSelections[2]);
        reduceVacuum(menuSelections[3]);
        reduceDiscriminating(menuSelections[4]);
        reducePositionSensitive(menuSelections[5]);
        return;
      case "levelSensing":
        reduceUsage(menuSelections[2]);
        reduceVacuum(menuSelections[3]);
        reduceDiscriminating(menuSelections[4]);
        reducePositionSensitive(menuSelections[5]);
        reduceLevelSensing(menuSelections[6]);
        return;
      case "staticTesting":
        reduceUsage(menuSelections[2]);
        reduceVacuum(menuSelections[3]);
        reduceDiscriminating(menuSelections[4]);
        reducePositionSensitive(menuSelections[5]);
        reduceLevelSensing(menuSelections[6]);
        reduceStaticTesting(menuSelections[7]);
        return;
      case "hydroStatic":
        reduceUsage(menuSelections[2]);
        reduceVacuum(menuSelections[3]);
        reduceDiscriminating(menuSelections[4]);
        reducePositionSensitive(menuSelections[5]);
        reduceLevelSensing(menuSelections[6]);
        reduceStaticTesting(menuSelections[7]);
        reduceHydroStatic(menuSelections[8]);
        return;
      case "solidState":
        reduceUsage(menuSelections[2]);
        reduceVacuum(menuSelections[3]);
        reduceDiscriminating(menuSelections[4]);
        reducePositionSensitive(menuSelections[5]);
        reduceLevelSensing(menuSelections[6]);
        reduceStaticTesting(menuSelections[7]);
        reduceHydroStatic(menuSelections[8]);
        reduceSolidState(menuSelections[9]);
        return;
      case "leakDetection":
        reduceUsage(menuSelections[2]);
        reduceVacuum(menuSelections[3]);
        reduceDiscriminating(menuSelections[4]);
        reducePositionSensitive(menuSelections[5]);
        reduceLevelSensing(menuSelections[6]);
        reduceStaticTesting(menuSelections[7]);
        reduceHydroStatic(menuSelections[8]);
        reduceSolidState(menuSelections[9]);
        reduceLeakDetection(menuSelections[10]);
        return;
      case "tankType":
        reduceUsage(menuSelections[2]);
        reduceVacuum(menuSelections[3]);
        reduceDiscriminating(menuSelections[4]);
        reducePositionSensitive(menuSelections[5]);
        reduceLevelSensing(menuSelections[6]);
        reduceStaticTesting(menuSelections[7]);
        reduceHydroStatic(menuSelections[8]);
        reduceSolidState(menuSelections[9]);
        reduceLeakDetection(menuSelections[10]);
        reduceTankType(menuSelections[11]);
        return;
      case "points":
        reduceUsage(menuSelections[2]);
        reduceVacuum(menuSelections[3]);
        reduceDiscriminating(menuSelections[4]);
        reducePositionSensitive(menuSelections[5]);
        reduceLevelSensing(menuSelections[6]);
        reduceStaticTesting(menuSelections[7]);
        reduceHydroStatic(menuSelections[8]);
        reduceSolidState(menuSelections[9]);
        reduceLeakDetection(menuSelections[10]);
        reduceTankType(menuSelections[11]);
        reducePoints(menuSelections[12]);
        return;
      case "sensorLength":
        reduceUsage(menuSelections[2]);
        reduceVacuum(menuSelections[3]);
        reduceDiscriminating(menuSelections[4]);
        reducePositionSensitive(menuSelections[5]);
        reduceLevelSensing(menuSelections[6]);
        reduceStaticTesting(menuSelections[7]);
        reduceHydroStatic(menuSelections[8]);
        reduceSolidState(menuSelections[9]);
        reduceLeakDetection(menuSelections[10]);
        reduceTankType(menuSelections[11]);
        reducePoints(menuSelections[12]);
        reduceSensorLength(menuSelections[13]);
        return;
      case "cableLength":
        reduceUsage(menuSelections[2]);
        reduceVacuum(menuSelections[3]);
        reduceDiscriminating(menuSelections[4]);
        reducePositionSensitive(menuSelections[5]);
        reduceLevelSensing(menuSelections[6]);
        reduceStaticTesting(menuSelections[7]);
        reduceHydroStatic(menuSelections[8]);
        reduceSolidState(menuSelections[9]);
        reduceLeakDetection(menuSelections[10]);
        reduceTankType(menuSelections[11]);
        reducePoints(menuSelections[12]);
        reduceSensorLength(menuSelections[13]);
        reduceCableLength(menuSelections[14]);
        return;
      case "tanks":
        reduceUsage(menuSelections[2]);
        reduceVacuum(menuSelections[3]);
        reduceDiscriminating(menuSelections[4]);
        reducePositionSensitive(menuSelections[5]);
        reduceLevelSensing(menuSelections[6]);
        reduceStaticTesting(menuSelections[7]);
        reduceHydroStatic(menuSelections[8]);
        reduceSolidState(menuSelections[9]);
        reduceLeakDetection(menuSelections[10]);
        switch (menuSelections[2])
          {
            case "usgTankAnl":
              if (menuSelections[3] === "vacYes")
                {
                  reduceTankType(menuSelections[11]);
                  ignoreSelectList("__htmlsnsrPoints");
                  ignoreSelectList("__htmlsnsrSensorLength");
                  ignoreSelectList("__htmlsnsrCableLength");
                  reduceTanks(menuSelections[15]);
                }
              else
                {
                  reduceTankType(menuSelections[11]);
                  reducePoints(menuSelections[12]);
                  reduceSensorLength(menuSelections[13]);
                  if (menuSelections[8] === "hsYes")  //tankAnnular and Hydrostatic sensor
                    {
                      ignoreSelectList("__htmlsnsrTankType");
                      reducePoints(menuSelections[12]);
                      reduceSensorLength(menuSelections[13]);
                      reduceCableLength(menuSelections[14]);
                      ignoreSelectList("__htmlsnsrTanks");
                    }
                  else
                    {
                      ignoreSelectList("__htmlsnsrTankType");
                      ignoreSelectList("__htmlsnsrPoints");
                      reduceSensorLength(menuSelections[13]);
                      reduceCableLength(menuSelections[14]);
                      ignoreSelectList("__htmlsnsrTanks");
                    }
                }
              break;
            case "usgStpAnl":
            case "usgDisPanAnl":
              if (menuSelections[3] === "vacYes")
                {
                  ignoreSelectList("__htmlsnsrTankType");
                  ignoreSelectList("__htmlsnsrPoints");
                  ignoreSelectList("__htmlsnsrSensorLength");
                  ignoreSelectList("__htmlsnsrCableLength");
                  reduceTanks(menuSelections[15]);
                }
              else
                {
                  if (menuSelections[8] === "hsYes")  //tankAnnular and Hydrostatic sensor
                    {
                      ignoreSelectList("__htmlsnsrTankType");
                      ignoreSelectList("__htmlsnsrPoints");
                      reduceSensorLength(menuSelections[13]);
                      reduceCableLength(menuSelections[14]);
                      ignoreSelectList("__htmlsnsrTanks");
                    }
                  else
                    {
                      ignoreSelectList("__htmlsnsrTankType");
                      ignoreSelectList("__htmlsnsrPoints");
                      reduceSensorLength(menuSelections[13]);
                      reduceCableLength(menuSelections[14]);
                      ignoreSelectList("__htmlsnsrTanks");
                    }
                }
              break;
            default:
              ignoreSelectList("__htmlsnsrTankType");
              ignoreSelectList("__htmlsnsrPoints");
              reduceSensorLength(menuSelections[13]);
              reduceCableLength(menuSelections[14]);
              ignoreSelectList("__htmlsnsrTanks");
              break;
          }

        case "pipes":
          reduceUsage(menuSelections[2]);
          reduceVacuum(menuSelections[3]);
          reduceDiscriminating(menuSelections[4]);
          reducePositionSensitive(menuSelections[5]);
          reduceLevelSensing(menuSelections[6]);
          reduceStaticTesting(menuSelections[7]);
          reduceHydroStatic(menuSelections[8]);
          reduceSolidState(menuSelections[9]);
          reduceLeakDetection(menuSelections[10]);

          switch (menuSelections[2])
            {
              case "usgTankAnl":
                if (menuSelections[3] === "vacYes")
                  {
                    reduceTankType(menuSelections[11]);
                    ignoreSelectList("__htmlsnsrPoints");
                    ignoreSelectList("__htmlsnsrSensorLength");
                    ignoreSelectList("__htmlsnsrCableLength");
                    reduceTanks(menuSelections[15]);
                    reducePipes(menuSelections[16]);
                  }
                else
                  {
                    reduceTankType(menuSelections[11]);
                    reducePoints(menuSelections[12]);
                    reduceSensorLength(menuSelections[13]);
                    if (menuSelections[8] === "hsYes")  //tankAnnular and Hydrostatic sensor
                      {
                        ignoreSelectList("__htmlsnsrTankType");
                        reducePoints(menuSelections[12]);
                        reduceSensorLength(menuSelections[13]);
                        reduceCableLength(menuSelections[14]);
                        ignoreSelectList("__htmlsnsrTanks");
                        ignoreSelectList("__htmlsnsrPipes");
                      }
                    else
                      {
                        ignoreSelectList("__htmlsnsrTankType");
                        ignoreSelectList("__htmlsnsrPoints");
                        reduceSensorLength(menuSelections[13]);
                        reduceCableLength(menuSelections[14]);
                        ignoreSelectList("__htmlsnsrTanks");
                        ignoreSelectList("__htmlsnsrPipes");
                      }
                  }
                break;
              case "usgStpAnl":
              case "usgDisPanAnl":
                if (menuSelections[3] === "vacYes")
                  {
                    ignoreSelectList("__htmlsnsrTankType");
                    ignoreSelectList("__htmlsnsrPoints");
                    ignoreSelectList("__htmlsnsrSensorLength");
                    ignoreSelectList("__htmlsnsrCableLength");
                    reduceTanks(menuSelections[15]);
                    reducePipes(menuSelections[16]);
                  }
                else
                  {
                    if (menuSelections[8] === "hsYes")  //tankAnnular and Hydrostatic sensor
                      {
                        ignoreSelectList("__htmlsnsrTankType");
                        ignoreSelectList("__htmlsnsrPoints");
                        reduceSensorLength(menuSelections[13]);
                        reduceCableLength(menuSelections[14]);
                        ignoreSelectList("__htmlsnsrTanks");
                        ignoreSelectList("__htmlsnsrPipes");
                      }
                    else
                      {
                        ignoreSelectList("__htmlsnsrTankType");
                        ignoreSelectList("__htmlsnsrPoints");
                        reduceSensorLength(menuSelections[13]);
                        reduceCableLength(menuSelections[14]);
                        ignoreSelectList("__htmlsnsrTanks");
                        ignoreSelectList("__htmlsnsrPipes");
                      }
                  }
                break;
              default:
                ignoreSelectList("__htmlsnsrTankType");
                ignoreSelectList("__htmlsnsrPoints");
                reduceSensorLength(menuSelections[13]);
                reduceCableLength(menuSelections[14]);
                ignoreSelectList("__htmlsnsrTanks");
                ignoreSelectList("__htmlsnsrPipes");
                break;
            }
    }
  }

  // *************************************************************************
  // The following set of functions handle the user's dropdown list selections.
  // Most of the click functions do the following:
  //   1) Capture user's selection
  //   2) Clear the remain dropdowns
  //   3) Narrow the selected sensors given the users selection
  //   4) Save the selection (prevMenu) in case user clicks out of sequence
  //   5) Build the following menu/menus. The selections in the dropdowns are
  //      reduced by the contents of the active probes. If a menu only has one
  //      entry, it is skipped showing the only available selection.
  // *************************************************************************
  function clickProductGroup(v) {
    buildMenuSelectList(0, v);           // Capture user's product group selection
    buildMenu("Product", v);             // Build the next menu, which is a list of 
                                         // ProductGroup subtypes (Product)
    // Clear the remaining menu selection entries.
    emptyAllSublists("__htmlsnsrUsage"); // clear remaing dropdowns
    prevMenu = "productGroup";
  }

  function clickProduct(v) {
    buildMenuSelectList(1, v);           // Build the next menu, which is a list of 
    emptyAllSublists("__htmlsnsrUsage"); // Clear remaining dropdowns
    findSensorByProduct(v);              // Narrow selected sensors by product
    prevMenu = "product";
    emptyAllSublists("__htmlsnsrUsage"); // clear remaing dropdowns
    buildMenuStructure("Usage", "usage");
  }

  function clickUsage(v) {
    if (v === "usgSelect")               // Ignore the "Select" entry
      return;
    buildMenuSelectList(2, v);           // Capture selected Usage
    rebuildSelectList("usage");          // Check in sequence request
    reduceUsage(v);                      // Reduce sensors by Usage
    prevMenu = "usage";
    emptyAllSublists("__htmlsnsrVacuum");// clear remaing dropdowns.
    buildMenuStructure("Vacuum", "vacuum");
  }

  function clickVacuum(v) {
    if (v === "vacSelect")
      return;
    buildMenuSelectList(3, v);
    rebuildSelectList("vacuum");
    reduceVacuum(v);
    prevMenu = "vacuum";
    emptyAllSublists("__htmlsnsrDiscriminating");
    buildMenuStructure("Discriminating", "discriminating");
  }

  function clickDiscriminating(v) {
    if (v === "disSelect")
      return;
    buildMenuSelectList(4, v);
    rebuildSelectList("discriminating");
    reduceDiscriminating(v);
    prevMenu = "discriminating";
    emptyAllSublists("__htmlsnsrPositionSensitive");
    buildMenuStructure("Position Sensitive", "positionSensitive");
  }

  function clickPositionSensitive(v) {
    if (v === "psSelect")
      return;
    buildMenuSelectList(5, v);
    rebuildSelectList("positionSensitive");
    reducePositionSensitive(v);
    prevMenu = "positionSensitive";
    emptyAllSublists("__htmlsnsrLevelSensing");
    buildMenuStructure("Level Sensing", "levelSensing");
  }

  function clickLevelSensing(v) {
    if (v === "lsSelect")
      return;
    buildMenuSelectList(6, v);
    rebuildSelectList("levelSensing");
    reduceLevelSensing(v);
    prevMenu = "levelSensing";
    emptyAllSublists("__htmlsnsrStaticTesting");
    buildMenuStructure("Static Testing", "staticTesting");
  }

  function clickStaticTesting(v) {
    if (v === "stSelect")
      return;
    buildMenuSelectList(7, v);
    rebuildSelectList("staticTesting");
    reduceStaticTesting(v);
    prevMenu = "staticTesting";
    emptyAllSublists("__htmlsnsrHydrostatic");
    buildMenuStructure("Hydro-Static", "hydroStatic");
  }

  function clickHydroStatic(v) {
    if (v === "hsSelect")
      return;
    buildMenuSelectList(8, v);
    rebuildSelectList("hydroStatic");
    reduceHydroStatic(v);
    prevMenu = "hydroStatic";
    emptyAllSublists("__htmlsnsrSolidState");
    buildMenuStructure("Solid State", "solidState");
  }

  function clickSolidState(v) {
    if (v === "ssSelect")
      return;
    buildMenuSelectList(9, v);
    rebuildSelectList("solidState");
    reduceSolidState(v);
    prevMenu = "solidState";
    emptyAllSublists("__htmlsnsrLeakDetection");
    buildMenuStructure("Leak Detection", "leakDetection");
  }

  function clickLeakDetection(v) {
    if (v === "ldSelect")
      return;
    buildMenuSelectList(10, v);
    rebuildSelectList("leakDetection");
    reduceLeakDetection(v);
    prevMenu = "leakDetection";

    // If Vacuum used, Sensor and Cable length are ignored
    // Tank Type is dependent on Usage set for tankAnnular
    if ((menuSelections[2] === "usgTankAnl") ||
        (menuSelections[3] === "vacYes"))
      {
        emptyAllSublists("__htmlsnsrTankType");
        buildMenuStructure("Tank Type", "tankType");
      }
    else
      {
        // Skip Tank Type
        ignoreSelectList("__htmlsnsrTankType");
        ignoreSelectList("__htmlsnsrPoints");
        emptyAllSublists("__htmlsnsrSensorLength");
        buildMenuStructure("Sensor Length", "sensorLength");
      }
  }

  function clickTankType(v) {
    if (v === "tnkSelect")
      return;
    buildMenuSelectList(11, v);
    rebuildSelectList("tankType");
    reduceTankType(v);
    prevMenu = "tankType";

    if (menuSelections[3] === "vacYes")
      {
        ignoreSelectList("__htmlsnsrPoints");
        ignoreSelectList("__htmlsnsrSensorLength");
        ignoreSelectList("__htmlsnsrCableLength");
        buildMenuStructure("Tanks", "tanks");
      }
    else
      {
        ignoreSelectList("__htmlsnsrTanks");
        ignoreSelectList("__htmlsnsrPipes");

        emptyAllSublists("__htmlsnsrPoints");
        buildMenuStructure("Points", "points");
      }
  }

  function clickPoints(v) {
    if (v === "ptSelect")
      return;
    buildMenuSelectList(12, v);
    rebuildSelectList("points");
    reducePoints(v);
    prevMenu = "points";
    emptyAllSublists("__htmlsnsrSensorLength");
    buildMenuStructure("Sensor Length", "sensorLength");
}

  function clickSensorLength(v) {
    if (v === "senSelect")
      return;
    buildMenuSelectList(13, v);
    rebuildSelectList("sensorLength");
    reduceSensorLength(v);
    prevMenu = "sensorLength";
    emptyAllSublists("__htmlsnsrCableLength");
    buildMenuStructure("Cable Length", "cableLength");
  }

  function clickCableLength(v) {
    if (v === "cblSelect")
      return;
    buildMenuSelectList(14, v);
    rebuildSelectList("cableLength");
    reduceCableLength(v);
    prevMenu = "cableLength";
    buildSensorPartNumber();
  }

  function clickTanks(v) {
    if (v === "tnkSelect")
      return;
    buildMenuSelectList(15, v);
    rebuildSelectList("tanks");
    reduceTanks(v);
    prevMenu = "tanks";
    emptyAllSublists("__htmlsnsrPipes");
    buildMenuStructure("Pipes", "pipes");
  }

  function clickPipes(v) {
    if (v === "pipeSelect")
      return;
    buildMenuSelectList(16, v);
    rebuildSelectList("pipes");
    reducePipes(v);
    prevMenu = "pipes";
    buildSensorPartNumber();
  }

  /*****************************************************************************
   * REDUCE FUNCTIONS:
   * Each function reduces the list of active/selected sensors by some selection.
   ****************************************************************************/
  function reduceUsage(v) {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "usgDisPan":
            if (sensorObj[i].usage.disPan === false) {
              sensorObj[i].active = false;
            }
            break;
          case "usgSpillPan":
            if (sensorObj[i].usage.spill === false) {
              sensorObj[i].active = false;
            }
            break;
          case "usgSTP":
            if (sensorObj[i].usage.stp === false) {
              sensorObj[i].active = false;
            }
            break;
          case "usgTankAnl":
            if (sensorObj[i].usage.tankAnnular === false) {
              sensorObj[i].active = false;
            }
            break;
          case "usgStpAnl":
            if (sensorObj[i].usage.stpAnnular === false) {
              sensorObj[i].active = false;
            }
            break;
          case "usgDisPanAnl":
            if (sensorObj[i].usage.disPanAnnular === false) {
              sensorObj[i].active = false;
            }
            break;
          case "usgMonWell":
            if (sensorObj[i].usage.monWell === false) {
              sensorObj[i].active = false;
            }
            break;
          case "usgStndaln":
            if (sensorObj[i].usage.standalone === false) {
              sensorObj[i].active = false;
            }
            break;
          case "usgCnvlt":
            if (sensorObj[i].usage.convault === false) {
              sensorObj[i].active = false;
            }
            break;
          case "usgOilWtrSep":
            if (sensorObj[i].usage.oilWaterSep === false) {
              sensorObj[i].active = false;
            }
            break;
        }
      }
    }
    displayActiveSensorCount();
  }

  function reduceVacuum(v) {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "vacYes":
            if (sensorObj[i].technology !== "vacuum") {
              sensorObj[i].active = false;
            }
            break;
          case "vacNo":
            if (sensorObj[i].technology !== "nonVacuum") {
              sensorObj[i].active = false;
            }
            break;
          }
        }
      }
    displayActiveSensorCount();
  }

  function reduceDiscriminating(v) {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "disYes":
            if (sensorObj[i].discriminating !== true) {
              sensorObj[i].active = false;
            }
            break;
          case "disNo":
            if (sensorObj[i].discriminating !== false) {
              sensorObj[i].active = false;
            }
            break;
        }
      }
    }
    displayActiveSensorCount();
  }

  function reducePositionSensitive(v) {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "psYes":
            if (sensorObj[i].positionSensitive !== true) {
              sensorObj[i].active = false;
            }
            break;
          case "psNo":
            if (sensorObj[i].positionSensitive !== false) {
              sensorObj[i].active = false;
            }
            break;
        }
      }
    }
    displayActiveSensorCount();
  }

  function reduceLevelSensing(v) {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "psYes":
            if (sensorObj[i].levelSensing !== true) {
              sensorObj[i].active = false;
            }
            break;
          case "psNo":
            if (sensorObj[i].levelSensing !== false) {
              sensorObj[i].active = false;
            }
            break;
        }
      }
    }
    displayActiveSensorCount();
  }

  function reduceStaticTesting(v) {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "stYes":
            if (sensorObj[i].staticTest !== true) {
              sensorObj[i].active = false;
            }
            break;
          case "stNo":
            if (sensorObj[i].staticTest !== false) {
              sensorObj[i].active = false;
            }
            break;
        }
      }
    }
    displayActiveSensorCount();
  }


  function reduceHydroStatic(v) {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "hsYes":
            if (sensorObj[i].hydroStatic !== true) {
              sensorObj[i].active = false;
            }
            break;
          case "hsNo":
            if (sensorObj[i].hydroStatic !== false) {
              sensorObj[i].active = false;
            }
            break;
        }
      }
    }
    displayActiveSensorCount();
  }

  function reduceSolidState(v) {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "ssYes":
            if (sensorObj[i].solidState !== true) {
              sensorObj[i].active = false;
            }
            break;
          case "ssNo":
            if (sensorObj[i].solidState !== false) {
              sensorObj[i].active = false;
            }
            break;
        }
      }
    }
    displayActiveSensorCount();
  }

  function reduceLeakDetection(v) {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "ldYes":
            if (sensorObj[i].leakDetection !== true) {
              sensorObj[i].active = false;
            }
            break;
          case "ldNo":
            if (sensorObj[i].leakDetection !== false) {
              sensorObj[i].active = false;
            }
            break;
        }
      }
    }
    displayActiveSensorCount();
  }

  function reduceTankType(v) {
    if (v !== '--')   // Usage/tankAnnular=TRUE?
      {
        // Yes, Tank Annular space sensor needed.
        for (let i = 0; i < sensorObj.length; i++) {
          if (sensorObj[i].active === true) {
            // Assume it isn't needed - decide to add it back below
            switch (v) {
              case "tnkFiber":
                if (sensorObj[i].tankType !== "Fiberglass") {
                  sensorObj[i].active = false;
                }
                break;
              case "tnkSteel":
                if (sensorObj[i].tankType !== "Steel") {
                  sensorObj[i].active = false;
                }
                break;
            }
          }
        }
      }
    else
      {
        ignoreSelectList("__htmlsnsrTankType");
        ignoreSelectList("__htmlsnsrPoints");
      }
    displayActiveSensorCount();
  }

  function reducePoints(v) {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "ptSingle":
            if (sensorObj[i].points !== 'Single') {
              sensorObj[i].active = false;
            }
            break;
          case "ptDual":
            if (sensorObj[i].points !== 'Dual') {
              sensorObj[i].active = false;
            }
            break;
        }
      }
    }
    displayActiveSensorCount();
  }

  function reduceSensorLength(v) {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch(v) {
          case "sen20":
            if (sensorObj[i].sensorLength !== "2.0in") {
              sensorObj[i].active = false;
            }
            break;
          case "sen22":
            if (sensorObj[i].sensorLength !== "2.2in") {
              sensorObj[i].active = false;
            }
            break;
          case "sen25":
            if (sensorObj[i].sensorLength !== "2.5in") {
              sensorObj[i].active = false;
            }
            break;
          case "sen35":
            if (sensorObj[i].sensorLength !== "3.5in") {
              sensorObj[i].active = false;
            }
            break;
          case "sen43":
            if (sensorObj[i].sensorLength !== "4.3in") {
              sensorObj[i].active = false;
            }
            break;
          case "sen49":
            if (sensorObj[i].sensorLength !== "4.9in") {
              sensorObj[i].active = false;
            }
            break;
          case "sen6":
            if (sensorObj[i].sensorLength !== "6.0in") {
              sensorObj[i].active = false;
            }
            break;
          case "sen116":
            if (sensorObj[i].sensorLength !== "11.6in") {
              sensorObj[i].active = false;
            }
            break;
          case "sen120":
            if (sensorObj[i].sensorLength !== "12.0in") {
              sensorObj[i].active = false;
            }
            break;
          case "sen173":
            if (sensorObj[i].sensorLength !== "17.3in") {
              sensorObj[i].active = false;
            }
            break;
          case "sen214":
            if (sensorObj[i].sensorLength !== "21.4in") {
              sensorObj[i].active = false;
            }
            break;
          case "sen221":
            if (sensorObj[i].sensorLength !== "22.1in") {
              sensorObj[i].active = false;
            }
            break;
          case "sen24":
            if (sensorObj[i].sensorLength !== "24in") {
              sensorObj[i].active = false;
            }
            break;
          case "sen334":
            if (sensorObj[i].sensorLength !== "33.4in") {
              sensorObj[i].active = false;
            }
            break;
          case "senCst":
            if (sensorObj[i].sensorLength !== "Customized") {
              sensorObj[i].active = false;
            }
            break;
        }
      }
    }
    displayActiveSensorCount();
  }

  function reduceCableLength(v) {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch(v) {
          case "cbl5":
          if (sensorObj[i].cableLength !== "5ft") {
            sensorObj[i].active = false;
          }
          break;
          case "cbl8":
            if (sensorObj[i].cableLength !== "8ft") {
              sensorObj[i].active = false;
            }
            break;
          case "cbl10":
            if (sensorObj[i].cableLength !== "10ft") {
              sensorObj[i].active = false;
            }
            break;
          case "cbl12":
            if (sensorObj[i].cableLength !== "12ft") {
              sensorObj[i].active = false;
            }
            break;
          case "cbl15":
            if (sensorObj[i].cableLength !== "15ft") {
              sensorObj[i].active = false;
            }
            break;
          case "cbl16":
            if (sensorObj[i].cableLength !== "16ft") {
              sensorObj[i].active = false;
            }
            break;
          case "cbl18":
            if (sensorObj[i].cableLength !== "18ft") {
              sensorObj[i].active = false;
            }
            break;
          case "cbl20":
            if (sensorObj[i].cableLength !== "20ft") {
              sensorObj[i].active = false;
            }
            break;
          case "cbl25":
            if (sensorObj[i].cableLength !== "25ft") {
              sensorObj[i].active = false;
            }
            break;
          case "cbl30":
            if (sensorObj[i].cableLength !== "30ft") {
              sensorObj[i].active = false;
            }
            break;
          case "cbl64i":
            if (sensorObj[i].cableLength !== "64in") {
              sensorObj[i].active = false;
            }
            break;
        }
      }
    }
    buildSensorPartNumber();
    ignoreSelectList("__htmlsnsrTanks");
    ignoreSelectList("__htmlsnsrPipes");
    displayActiveSensorCount();
  }

  function reduceTanks(v) {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch(v) {
          case "tnkNone":
          if (sensorObj[i].tanks !== "0") {
            sensorObj[i].active = false;
          }
          break;
          case "tnk1":
            if (sensorObj[i].tanks !== "1") {
              sensorObj[i].active = false;
            }
            break;
        }
      }
    }
    displayActiveSensorCount();
  }

  function reducePipes(v) {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch(v) {
        case "pipeNone":
          if (sensorObj[i].pipes !== "0") {
            sensorObj[i].active = false;
          }
          break;
        case "pipe1":
          if (sensorObj[i].pipes !== "1") {
            sensorObj[i].active = false;
          }
          break;
        case "pipe2":
          if (sensorObj[i].pipes !== "2") {
            sensorObj[i].active = false;
          }
          break;
        case "pipe3":
          if (sensorObj[i].pipes !== "3") {
            sensorObj[i].active = false;
          }
          break;
        case "pipe4":
          if (sensorObj[i].pipes !== "4") {
            sensorObj[i].active = false;
          }
          break;
        }
      }
    }
    displayActiveSensorCount();
    buildSensorPartNumber();
  }

  // Clear the fields that have been displayed.
  function clearOutput() {
    document.getElementById("__htmlTaxonomy1PartNumber").innerHTML = ' ';
    if (debugFlag === 'on')
    {
      document.getElementById("__htmlsnsrDescription").innerHTML = ' ';
      for (let i=0; i < sensorObj[0].accessory.length; i++){
        document.getElementById(`__htmlsnsrAccessory${i+1}`).innerHTML =' ';
        document.getElementById(`__htmlsnsrAccessoryDesc${i+1}`).innerHTML=' ';
      }
      document.getElementById("__htmlsnsrCount").innerHTML = `0 of ${maxSensors}`;
      document.getElementById("__htmlsnsrCountList").innerHTML = ' ';
      for (let i=1; i <= sensorObj[0].support.length; i++){
        document.getElementById(`__htmlsnsrGauge${i}`).innerHTML=" ";
        document.getElementById(`__htmlsnsrSoftware${i}`).innerHTML=" ";
        document.getElementById(`__htmlsnsrInterface${i}`).innerHTML=" ";
        document.getElementById(`__htmlsnsrConnect${i}`).innerHTML=" ";
      }
    }
  }

  // Return the index for the first active/selected probe.
  function getActiveSensorIndex() {
    for (let i = 0; i < sensorObj.length; i++) {
      if (sensorObj[i].active === true) {
        return i; // Return active probe count
      }
    }
    return(-1);   // return -1 if nothing found. Caller should check for -1.
  }

  function buildAccessoryList(selectedIndex) {
    accessoryCount=0;
    //Loop over the accessories for the selected Part Number
    for (let i=0; i < sensorObj[selectedIndex].accessory.length; i++){
      if (sensorObj[selectedIndex].accessory[i].pNum !=='--'){  // Entry not empty?
        // find the accessory part in the table
        for (let j = 0; j < sensorObj.length; j++) {
          if (sensorObj[j].pNum === sensorObj[selectedIndex].accessory[i].pNum) {
            accessoryCount++;
            if (debugFlag === 'on')
              document.getElementById(`__htmlsnsrAccessory${accessoryCount}`).innerHTML =sensorObj[j].pNum;
            if (debugFlag === 'on')
              document.getElementById(`__htmlsnsrAccessoryDesc${accessoryCount}`).innerHTML=sensorObj[j].partItemDesc;
          }
        }
      }
    }
  }

  function buildConsoleList(selectedIndex) {
    let gaugeCount=1;
    //Loop over the accessories for the selected Part Number
    for (let i=0; i < sensorObj[selectedIndex].support.length; i++){
      if (sensorObj[selectedIndex].support[i].gauge !=='--'){  // Entry not empty?
        // find the accessory part in the table
        if (debugFlag === 'on')
          document.getElementById(`__htmlsnsrGauge${gaugeCount}`).innerHTML =sensorObj[selectedIndex].support[i].gauge;
        if (debugFlag === 'on')
          document.getElementById(`__htmlsnsrSoftware${gaugeCount}`).innerHTML=sensorObj[selectedIndex].support[i].software;
        if (debugFlag === 'on')
          document.getElementById(`__htmlsnsrInterface${gaugeCount}`).innerHTML =sensorObj[selectedIndex].support[i].interface;
        if (sensorObj[selectedIndex].support[i].connect === 'wired')
          {
            if (debugFlag === 'on')
              document.getElementById(`__htmlsnsrConnect${gaugeCount}`).innerHTML='Direct Wired';
          }
        else
          {
            if (debugFlag === 'on')
              document.getElementById(`__htmlsnsrConnect${gaugeCount}`).innerHTML='Direct Wired and wireless';
          }
        gaugeCount++;
      }
    }
  }

  function buildSensorPartNumber() {
    let activeSensorIndex=0;
    let sensorPartNumber="";
    let supportedConsoles="";
    let supportCount=0;

    activeSensorIndex=getActiveSensorIndex();
    if (activeSensorIndex===-1)
      {
        // Indicate there was no matching sensor.
        if (debugFlag === 'on')
          document.getElementById("__htmlsnsrDescription").innerHTML =
            '** No Part Number Found **';
        return;
      }
    else
      {
        if (debugFlag === 'on')
          document.getElementById("__htmlsnsrDescription").innerHTML =
            sensorObj[activeSensorIndex].partItemDesc;
      }

    if (menuSelections[3] ==="vacNo")
    {
      ignoreSelectList("__htmlsnsrTanks");
      ignoreSelectList("__htmlsnsrPipes");
    }

    buildAccessoryList(activeSensorIndex);
    buildConsoleList(activeSensorIndex);

//    let node = document.getElementById('__htmlBaseLink');
//    htmlBaseLink = node.textContent;
    sensorPartNumber=sensorObj[activeSensorIndex].pNum;
    document.getElementById("__htmlTaxonomy1PartNumber").innerHTML =
      `${sensorPartNumber}`;
  }

  // Update the menuSelections list with the current menu selection from the
  // user. Make sure all the remaining entries contain "empty".
  function buildMenuSelectList(listLevel, listSelection) {
    menuSelections[listLevel] = listSelection;
    for (let i = listLevel + 1; i < menuSelections.length; i++) {
      menuSelections[i] = "empty";
    }
  }

  /* Each menu list contains selectable entries based on all possible entries
   * for that menu. Entries are left out of the displayed/active Menu list
   * if the active data doesn't support the selection. So, the displayed menu
   * list will only have entries which lead to valid data selections.
   */
  function addItemActiveMenuList(item) {
    var found = false;
    let i = 0;
    for (; i < activeMenuList.length; i++) {
      if (activeMenuList[i] === item)
        return;
    }
    activeMenuList[i] = item;
  }

  // Remove all entries from the active menu list.
  function clearItemActiveMenuList() {
    activeMenuList = [];
  }

  function itemInActiveMenuItemList(item) {
    for (let i = 0; i < activeMenuList.length; i++) {
      if (activeMenuList[i] === item)
        return true;
    }
    return false;
  }

  /* Create the drop-down button menu list.
   * The list consists of elements from the menuObj for each selection group.
   * The actual displayed list is reduced to match the actual selectable
   * items. The Product Group and Product menus are the first menus available
   * and are forced to contain all the menu items.
   */
  function buildActiveMenuList(menuName, menuGroup) {
    if (menuName === "Product Group") {
      activeMenuList = ["grpAviation", "grpAlternative",  "grpDiesel", "grpGasoline", "grpLightOil"];
      return (activeMenuList.length);
    }
    if (menuName === "Product") {
      switch (menuGroup) {
        case "grpAviation":
          activeMenuList = ["avtypSelect", "avJP8", "avJP10" ];
          break;
        case "grpAlternative":
          activeMenuList = ["aftypSelect", "afDEF", "afEthanolE15", "afEthanolE85", "afEthanolE100"];
          break;
        case "grpDiesel":
          activeMenuList = ["dstypSelect", "dsBiodiesel20", "dsBiodiesel100", "dsDiesel", "dsRenewDiesel", "dsKerosene"];
          break;
        case "grpGasoline":
          activeMenuList = ["gstypSelect", "gsLeaded", "gsPremium", "gsAviation", "gsRegular"];
          break;
        case "grpLightOil":
          activeMenuList = ["lotypSelect", "loWasoil", "loMotoil"];
          break;
        default:
          return;
      }
      return (activeMenuList.length);
    }

    clearItemActiveMenuList();

    // The "Select" message entries are handled separately and forced into
    // the menu because there is no data associated with them.
    switch (menuGroup) {
      case "usage":
        addItemActiveMenuList("usgSelect");
        break;
      case "vacuum":
        addItemActiveMenuList("vacSelect");
        break;
      case "discriminating":
        addItemActiveMenuList("disSelect");
        break;
      case "positionSensitive":
        addItemActiveMenuList("psSelect");
        break;
      case "levelSensing":
        addItemActiveMenuList("lsSelect");
        break;
      case "staticTesting":
        addItemActiveMenuList("stSelect");
        break;
      case "hydroStatic":
        addItemActiveMenuList("hsSelect");
        break;
      case "solidState":
        addItemActiveMenuList("ssSelect");
        break;
      case "leakDetection":
        addItemActiveMenuList("ldSelect");
        break;
      case "tankType":
        addItemActiveMenuList("tnkSelect");
        break;
      case "points":
        addItemActiveMenuList("ptSelect");
        break;
      case "sensorLength":
        addItemActiveMenuList("senSelect");
        break;
      case "cableLength":
        addItemActiveMenuList("cblSelect");
        break;
      case "tanks":
        addItemActiveMenuList("tnkSelect");
        break;
      case "pipes":
        addItemActiveMenuList("pipeSelect");
        break;
      }

    // Handle specific menu item and reduce the list to active data.
    for (let i = 0; i < sensorObj.length; i++) {
        if (sensorObj[i].active === true) {
          switch (menuGroup) {
            case "usage":
              if (sensorObj[i].usage.disPan === true) {
                addItemActiveMenuList("usgDisPan");
              }
              if (sensorObj[i].usage.disPanAnnular === true) {
                addItemActiveMenuList("usgDisPanAnl");
              }
              if (sensorObj[i].usage.monWell === true) {
                addItemActiveMenuList("usgMonWell");
              }
              if (sensorObj[i].usage.standalone === true) {
                addItemActiveMenuList("usgStndaln");
              }
              if (sensorObj[i].usage.convault === true) {
                addItemActiveMenuList("usgCnvlt");
              }
              if (sensorObj[i].usage.oilWaterSep === true) {
                addItemActiveMenuList("usgOilWtrSep");
              }
              if (sensorObj[i].usage.spill === true) {
                addItemActiveMenuList("usgSpillPan");
              }
              if (sensorObj[i].usage.stp === true) {
                addItemActiveMenuList("usgSTP");
              }
              if (sensorObj[i].usage.stpAnnular === true) {
                addItemActiveMenuList("usgStpAnl");
              }
              if (sensorObj[i].usage.tankAnnular === true) {
                addItemActiveMenuList("usgTankAnl");
              }
              break;
            case "vacuum":
              if (sensorObj[i].technology === "vacuum") {
                addItemActiveMenuList("vacYes");
              }
              else {
                addItemActiveMenuList("vacNo");
              }
              break;
            case "discriminating":
              if (sensorObj[i].discriminating === true) {
                addItemActiveMenuList("disYes");
              } else {
                addItemActiveMenuList("disNo");
              }
              break;
            case "positionSensitive":
              if (sensorObj[i].positionSensitive === true) {
                addItemActiveMenuList("psYes");
              } else {
                addItemActiveMenuList("psNo");
              }
              break;

            case "levelSensing":
              if (sensorObj[i].levelSensing === true) {
                addItemActiveMenuList("lsYes");
              } else {
                addItemActiveMenuList("lsNo");
              }
              break;

            case "staticTesting":
              if (sensorObj[i].staticTest === true) {
                addItemActiveMenuList("stYes");
              } else {
                addItemActiveMenuList("stNo");
              }
              break;

            case "hydroStatic":
              if (sensorObj[i].hydroStatic === true) {
                addItemActiveMenuList("hsYes");
              } else {
                addItemActiveMenuList("hsNo");
              }
              break;

            case "solidState":
              if (sensorObj[i].solidState === true) {
                addItemActiveMenuList("ssYes");
              } else {
                addItemActiveMenuList("ssNo");
              }
              break;

            case "leakDetection":
              if (sensorObj[i].leakDetection === true) {
                addItemActiveMenuList("ldYes");
              } else {
                addItemActiveMenuList("ldNo");
              }
              break;

            case "tankType":
              switch (sensorObj[i].tankType) {
                case "BrineFilled":
                if ((menuSelections[2] === "usgStpAnl") ||
                    (menuSelections[2] === "usgStpAnl"))
                    addItemActiveMenuList("tnkBrine");
                  break;
                case "Fiberglass":
                  if ((menuSelections[2] === "usgStpAnl") ||
                      (menuSelections[2] === "usgStpAnl"))
                    addItemActiveMenuList("tnkFiber");
                  break;
                case "Steel":
                  if ((menuSelections[2] === "usgStpAnl") ||
                      (menuSelections[2] === "usgStpAnl"))
                    addItemActiveMenuList("tnkSteel");
                  break;
                  case "None":
                  if ((menuSelections[2] === "usgStpAnl") ||
                      (menuSelections[2] === "usgStpAnl"))
                    addItemActiveMenuList("tnkNone");
                  break;
                case "--":
                  if ((menuSelections[2] !== "usgTankAnl") &&
                      (menuSelections[2] !== "usgCnvlt"))
                    addItemActiveMenuList("tnkEmpty");
                  break;
              }
              break;
            case "points":
              switch (sensorObj[i].points) {
                case "Dual":
                  addItemActiveMenuList("ptDual");
                  break;
                case "Single":
                  addItemActiveMenuList("ptSingle");
                  break;
                case "None":
                  addItemActiveMenuList("ptNone");
                  break;
              }
              break;

            case "sensorLength":
              switch (sensorObj[i].sensorLength) {
                case "2.0in":
                  addItemActiveMenuList("sen20");
                  break;
                case "2.2in":
                  addItemActiveMenuList("sen22");
                  break;
                case "2.5in":
                  addItemActiveMenuList("sen25");
                  break;
                case "3.5in":
                  addItemActiveMenuList("sen35");
                  break;
                case "4.3in":
                  addItemActiveMenuList("sen43");
                  break;
                case "4.9in":
                  addItemActiveMenuList("sen49");
                  break;
                case "6.0in":
                  addItemActiveMenuList("sen6");
                  break;
                case "11.6in":
                  addItemActiveMenuList("sen116");
                  break;
                case "12.0in":
                  addItemActiveMenuList("sen120");
                  break;
                case "17.3in":
                  addItemActiveMenuList("sen173");
                  break;
                case "21.4in":
                  addItemActiveMenuList("sen214");
                  break;
                case "22.1in":
                  addItemActiveMenuList("sen221");
                  break;
                case "24in":
                  addItemActiveMenuList("sen24");
                  break;
                case "33.4in":
                  addItemActiveMenuList("sen334");
                  break;
                case "Customized":
                  addItemActiveMenuList("senCst");
                  break;
              }
              break;
            case "cableLength":
              switch (sensorObj[i].cableLength) {
                case "5ft":
                  addItemActiveMenuList("cbl5");
                  break;
                case "8ft":
                  addItemActiveMenuList("cbl8");
                  break;
                case "10ft":
                  addItemActiveMenuList("cbl10");
                  break;
                case "12ft":
                  addItemActiveMenuList("cbl12");
                  break;
                case "15ft":
                  addItemActiveMenuList("cbl15");
                  break;
                case "16ft":
                  addItemActiveMenuList("cbl16");
                  break;
                case "18ft":
                  addItemActiveMenuList("cbl18");
                  break;
                case "20ft":
                  addItemActiveMenuList("cbl20");
                  break;
                case "25ft":
                  addItemActiveMenuList("cbl25");
                  break;
                case "30ft":
                  addItemActiveMenuList("cbl30");
                  break;
                case "64in":
                  addItemActiveMenuList("cbl64i");
                  break;
              }
              break;

            case "tanks":
              switch (sensorObj[i].tanks) {
                case "0":
                  if ((menuSelections[2] !== "usgTankAnl") &&
                      (menuSelections[2] !== "usgCnvlt"))
                    addItemActiveMenuList("tnkNone");
                  break;
                case "1":
                  if ((menuSelections[2] === "usgTankAnl") ||
                      (menuSelections[2] === "usgCnvlt"))
                    addItemActiveMenuList("tnk1");
                  break;
              }
              break;
            case "pipes":
              switch (sensorObj[i].pipes) {
                case "0":
                  addItemActiveMenuList("pipeNone");
                  break;
                case "1":
                  addItemActiveMenuList("pipe1");
                  break;
                case "2":
                  addItemActiveMenuList("pipe2");
                  break;
                case "3":
                  addItemActiveMenuList("pipe3");
                  break;
                case "4":
                  addItemActiveMenuList("pipe4");
                  break;
              }
            break;
          }
        }
      }
    // Return selectable item entries from the list. The "Please Select" 
    // Message isn't included. Used to skip a menu if there is only one entry.
    return (activeMenuList.length - 1)
  }

  // Build a drop-down list from a JSON Menu object
  function buildMenu(menuName, menuGroup) {
    let i = 0;
    j = 0;
    k = 0;
    activeItems = 0;

    // Capture number of entries in the menu list. If 1 entry, the user doesn't
    // need to select. It is automatically selected.
    activeItems = buildActiveMenuList(menuName, menuGroup);

    // Find the menu object to build
    for (i = 0; i < menuObj.length; i++) {
      // Find the menu  in the menu array
      if (menuObj[i].dlName === menuName) {
        // Menu item found. Go Through menu items and create menu.
        for (k = 0; k < menuObj[i].dlList.length; k++) {
          // Product was special requiring a submenu.
          if (menuObj[i].dlList[k].ddSelectionId == menuGroup) {
              var x = document.getElementById(menuObj[i].dlSelectList);
              clearSelectList(x);
              for (j = 0; j < menuObj[i].dlList[k].ddProductGroupItems.length; j++) {
                // Check if the item is in the Active Menu Item list.
                // If it is, the item should be added to the dropdown list.
                if (itemInActiveMenuItemList(menuObj[i].dlList[k].ddProductGroupItems[j].value)) {
                  var option = document.createElement("option");

                  option.text = menuObj[i].dlList[k].ddProductGroupItems[j].ddItem;
                  if (activeItems <= 1) {
                    // If 1 item in current menu, it should be 
                    // displayed but not be selectable. The first
                    // entry may be the "Please Select" message.
                    if (j === 0)
                      option.selected = false;
                    else
                      option.selected = true;
                    option.disabled = true;
                  } else // Multiple entries available.
                  {
                    if (menuObj[i].dlList[k].ddProductGroupItems[j].selected) {
                      option.selected = true;
                    };
                    if (menuObj[i].dlList[k].ddProductGroupItems[j].grayed) {
                      option.disabled = true;
                    }
                  }
                  option.value = menuObj[i].dlList[k].ddProductGroupItems[j].value;
                  x.add(option);
                }
              }
            if (activeItems <= 1) {
              // Menu has one selectable item. Disable the menu and
              // use that selection. The user doesn't need to select.
              disableSelectList(menuObj[i].dlSelectList);
            } else {
              // Allow the user to select something from the drop-down.
              enableSelectList(menuObj[i].dlSelectList);
            }
            // The Build structure needs to know how many items. are 
            // selectable in the list.
            return activeItems;
          }
        }
      }
    }
  }

  function setAllSensorsInactive() {
    for (let i = 0; i < sensorObj.length; i++) {
      sensorObj[i].active = false;
    }
  };

  function findSensorByProduct(product) {
    for (let i = 0; i < sensorObj.length; i++) {
      sensorObj[i].active = false;
      switch (product) {
        case "afEthanolE100":
          if (sensorObj[i].prd.afEthanolE100 === true) {
            sensorObj[i].active = true;
          }
          break;
        case "afEthanolE85":
          if (sensorObj[i].prd.afEthanolE85 === true) {
            sensorObj[i].active = true;
          }
          break;
        case "afEthanolE15":
          if (sensorObj[i].prd.afEthanolE15 === true) {
            sensorObj[i].active = true;
          }
          break;

        case "afDEF":
          if (sensorObj[i].prd.afDEF === true) {
            sensorObj[i].active = true;
          }
          break;
        case "avJP8":
          if (sensorObj[i].prd.avJP8 === true) {
            sensorObj[i].active = true;
          }
          break;
        case "avJP10":
          if (sensorObj[i].prd.avJP10 === true) {
            sensorObj[i].active = true;
          }
          break;
        case "dsBiodiesel20":
          if (sensorObj[i].prd.dsBiodiesel20 === true) {
            sensorObj[i].active = true;
          }
          break;
        case "dsBiodiesel100":
          if (sensorObj[i].prd.dsBiodiesel100 === true) {
            sensorObj[i].active = true;
          }
          break;
        case "dsDiesel":
          if (sensorObj[i].prd.dsDiesel === true) {
            sensorObj[i].active = true;
          }
          break;
        case "dsRenewDiesel":
          if (sensorObj[i].prd.dsRenewDiesel === true) {
            sensorObj[i].active = true;
          }
          break;
        case "dsKerosene":
          if (sensorObj[i].prd.dsKerosene === true) {
            sensorObj[i].active = true;
          }
          break;
        case "gsLeaded":
          if (sensorObj[i].prd.gsLeaded === true) {
            sensorObj[i].active = true;
          }
          break;
        case "gsPremium":
          if (sensorObj[i].prd.gsPremium === true) {
            sensorObj[i].active = true;
          }
          break;
        case "gsRegular":
          if (sensorObj[i].prd.gsRegular === true) {
            sensorObj[i].active = true;
          }
          break;
        case "gsAviation":
          if (sensorObj[i].prd.gsAviation === true) {
            sensorObj[i].active = true;
          }
          break;
        case "loWasoil":
          if (sensorObj[i].prd.loWasoil === true) {
            sensorObj[i].active = true;
          }
          break;
        case "loMotoil":
          if (sensorObj[i].prd.loMotoil === true) {
            sensorObj[i].active = true;
          }
          break;
      }
    }
    displayActiveSensorCount();
  }

  function buildHTMLFieldNames() {
    if (debugFlag === 'on')
      document.getElementById("__htmlfldPartNumber").innerHTML="<b>Sensor Part Number</b>";
    if (debugFlag === 'on')
      document.getElementById("__htmlfldConsole").innerHTML="<b>Supported Consoles</b>";

    for (let i = 0; i < menuObj.length; i++) {
      document.getElementById(menuObj[i].dlFieldName).innerHTML = `<b>${menuObj[i].dlName}</b>`;
    }
  }

  function displayActiveSensorCount() {
  //TBA: Remove body of this function for production
      let j = 0;
      i = 0;
      for (; i < sensorObj.length; i++) {
        if (sensorObj[i].active === true)
          j++;
      }
      if (debugFlag === 'on')
        document.getElementById("__htmlsnsrCount").innerHTML = j + ' of ' + maxSensors;
      i = 0;
      let sensorList='';
      for (; i < sensorObj.length; i++) {
        if (sensorObj[i].active === true) {
          if(sensorList !== '')
            sensorList=sensorList+', ';
          sensorList=sensorList+sensorObj[i].sensorId;
        }
      }
      if (debugFlag === 'on')
        document.getElementById("__htmlsnsrCountList").innerHTML = sensorList;
    }
    
  function buildMenuStructure(menuName, menuGroup) {
    // If the new menu structure only has one selection (e.g. two entries),
    // it has the "Select "--Please Select--" entry and one selectable
    // entry. Meaning there was only one possible selection. We won't force
    // the user to select it. We move onto the next entry until we get to
    // the end of the list or one that has more than two selectable entries.
    let buildMenuCount = buildMenu(menuName, menuGroup);
    if (buildMenuCount <= 1) {
      switch (menuGroup) {
        case "usage":
          menuSelections[2] = activeMenuList[1];
          reduceUsage(menuSelections[2]);
          prevMenu = "usage";
          if (buildMenuStructure("Vacuum", "vacuum"))
            return (true);
        case "vacuum":
          menuSelections[3] = activeMenuList[1];
          reduceVacuum(menuSelections[3]);
          prevMenu = "vacuum";
          if (buildMenuStructure("Discriminating", "discriminating"))
          return (true);
        case "discriminating":
            menuSelections[4] = activeMenuList[1];
            reduceDiscriminating(menuSelections[4]);
            prevMenu = "discriminating";
            if (buildMenuStructure("Position Sensitive", "positionSensitive"))
            return (true);
        case "positionSensitive":
          menuSelections[5] = activeMenuList[1];
          reducePositionSensitive(menuSelections[5]);
          prevMenu = "positionSensitive";
          if (buildMenuStructure("Level Sensing", "levelSensing"))
            return (true);
        case "levelSensing":
          menuSelections[6] = activeMenuList[1];
          reduceLevelSensing(menuSelections[6]);
          prevMenu = "levelSensing";
          if (buildMenuStructure("Static Testing", "staticTesting"))
            return (true);
        case "staticTesting":
          menuSelections[7] = activeMenuList[1];
          reduceStaticTesting(menuSelections[7]);
          prevMenu = "staticTesting";
          if (buildMenuStructure("Hydro-Static", "hydroStatic"))
            return (true);
        case "hydroStatic":
          menuSelections[8] = activeMenuList[1];
          reduceHydroStatic(menuSelections[8]);
          prevMenu = "hydroStatic";
          if (buildMenuStructure("Solid State", "solidState"))
            return (true);
        case "solidState":
          menuSelections[9] = activeMenuList[1];
          reduceSolidState(menuSelections[9]);
          prevMenu = "solidState";
          if (buildMenuStructure("Leak Detection", "leakDetection"))
            return (true);
        case "leakDetection":
          menuSelections[10] = activeMenuList[1];
          reduceLeakDetection(menuSelections[10]);
          prevMenu = "leakDetection";
          // Tank Type is dependent on Usage set for tankAnnular


          switch (menuSelections[2])
          {
            case "usgTankAnl":
              if (menuSelections[3] === "vacYes")
                {
                  ignoreSelectList("__htmlsnsrPoints");
                  ignoreSelectList("__htmlsnsrSensorLength");
                  ignoreSelectList("__htmlsnsrCableLength");
                  if (buildMenuStructure("Tank Type", "tankType"))
                    return (true);
                }
              else
                {
                  if (menuSelections[8] === "hsYes")  //tankAnnular and Hydrostatic sensor
                    {
                      ignoreSelectList("__htmlsnsrTankType");
                      ignoreSelectList("__htmlsnsrTanks");
                      ignoreSelectList("__htmlsnsrPipes");
                      if (buildMenuStructure("Points", "points"))
                        return (true);
                    }
                  else
                    {
                      ignoreSelectList("__htmlsnsrTankType");
                      ignoreSelectList("__htmlsnsrPoints");
                      ignoreSelectList("__htmlsnsrTanks");
                      ignoreSelectList("__htmlsnsrPipes");
                      if (buildMenuStructure("Sensor Length", "sensorLength"))
                        return (true);
                    }
                }
              break;
            case "usgStpAnl":
            case "usgDisPanAnl":
              if (menuSelections[3] === "vacYes")
                {
                  ignoreSelectList("__htmlsnsrTankType");
                  ignoreSelectList("__htmlsnsrPoints");
                  ignoreSelectList("__htmlsnsrSensorLength");
                  ignoreSelectList("__htmlsnsrCableLength");
                  if (buildMenuStructure("Tanks", "tanks"))
                    return (true);
                }
              else
                {
                  ignoreSelectList("__htmlsnsrTankType");
                  ignoreSelectList("__htmlsnsrPoints");
                  ignoreSelectList("__htmlsnsrTanks");
                  ignoreSelectList("__htmlsnsrPipes");
                  if (buildMenuStructure("Sensor Length", "sensorLength"))
                    return (true);
                }
              break;
            default:
              ignoreSelectList("__htmlsnsrTankType");
              ignoreSelectList("__htmlsnsrPoints");
              ignoreSelectList("__htmlsnsrTanks");
              ignoreSelectList("__htmlsnsrPipes");
              if (buildMenuStructure("Tank Type", "tankType"))
                return (true);
              break;
          }


        case "tankType":
          menuSelections[11] = activeMenuList[1];
          reduceTankType(menuSelections[11]);
          prevMenu = "tankType";

          if (menuSelections[3] ==="vacYes")
            {
              ignoreSelectList("__htmlsnsrTankType");
              ignoreSelectList("__htmlsnsrPoints");
              ignoreSelectList("__htmlsnsrSensorLength");
              ignoreSelectList("__htmlsnsrCableLength");
              if (buildMenuStructure("Tanks", "tanks"))
                return (true);
            }
          if (buildMenuStructure("Sensor Length", "sensorLength"))
            return (true);
        case "points":
          menuSelections[12] = activeMenuList[1];
          reducePoints(menuSelections[12]);
          prevMenu = "points";
          if (buildMenuStructure("Sensor Length", "sensorLength"))
            return (true);
        case "sensorLength":
          menuSelections[13] = activeMenuList[1];
          reduceSensorLength(menuSelections[13]);
          prevMenu = "sensorLength";
          if (buildMenuStructure("Cable Length", "cableLength"))
            return (true);
        case "cableLength":
          menuSelections[14] = activeMenuList[1];
          reduceCableLength(menuSelections[14]);
          prevMenu = "cableLength";
          if (menuSelections[3] ==="vacNo")
          {
            return (true);
          }

          if (buildMenuStructure("Tanks", "tanks"))
            return (true);
        case "tanks":
          menuSelections[15] = activeMenuList[1];
          reduceTanks(menuSelections[15]);
          prevMenu = "tanks";
          if (buildMenuStructure("Pipes", "pipes"))
            return (true);
        case "pipes":
          menuSelections[16] = activeMenuList[1];
          reduceTanks(menuSelections[16]);
          prevMenu = "pipes";
          return (true);
      }
    }
    return (true);
  }

  // ****** Main section of code - get things started
  if (debugFlag === 'on')
    document.getElementById("__htmlTaxonomy1Version").innerHTML = __sensorVersion;

  getNumberOfSensors();

  buildHTMLFieldNames();

  // Build the initial Menu Entries - Use the default Product Group selection.
  buildMenu("Product Group", "productGroup");
  buildMenu("Product", "grpGasoline");

  // Clear the remaining menu selection entries.
  emptyAllSublists("__htmlsnsrUsage");

  setAllSensorsInactive();
  displayActiveSensorCount();
