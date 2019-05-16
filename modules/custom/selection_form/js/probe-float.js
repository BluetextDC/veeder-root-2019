/* To compress the javascript file, use https://jscompress.com with the 
 * ECMAScript 2018 checkbox checked.
 *
 * ProbeFloatKit.js contains a database in JSON of Veeder-Root probe and float
 * data. A set of menu in HTML is used with onclick requests into the js code
 * to control the selection of probes and floats. Each menu selection further
 * reduces the selected probes and floats. At the end of the menu selection
 * process there should be 1 probe and 1 float selected. The user can then
 * click on links to the data sheets on each of the products with details 
 * including part nummbers for ordering.
 *
 * The intial menu selection is the product type (gasoline, diesel, etc.)
 * which helps significantly reduce the available products that meet the need.
*/

var debugFlag = 'off';  // 'on'=turns debugging anything else off
var __probeFloatVersion = 'Probe/Float Version: 0.1.0'; // added to track version being sent to Blue Text

  /* As the user makes menu selections, the menu selection is 
   * stored in menuSelections. Each entry in the array is associated
   * with a selection menu box.
   * Store the click selection value from each menu selection level
   * (e.g. grpGasoline, prdGasoline, tnktypUST, etc).
   * This is needed for when a user moves to a menu that has already
   * been selected so that we can reselect probes and floats from the
   * JSON data.
   * 
   * [0]=Product Group     [1]=Product          [2]=Tank Type
   * [3]=Leak Detection    [4]=Probe Material   [5]=Canister Cover
   * [6]=Approval          [7]=Density          [8]=Water Detection
   * [9]=Connection        [10]=Probe Length    [11]=Float Size
   * [12]=Float Type       [13]=Cable Length
  */
  var menuSelections = ["grpGasoline", "empty", "empty", "empty", "empty", 
                        "empty", "empty", "empty", "empty", "empty", "empty",
                        "empty", "empty", "empty"] ;

  // prevMenu is used to track what the last menu group was. The menus
  // should be selected in order. If they are not, the menus that follow
  // should be cleared until the user reaches that menu group.
  var prevMenu="";

  // activeMenuList contains the selected menu item or if there is only one
  // itme in a list; that item.
  var activeMenuList=["empty"];

  // menus contains a JSON structure which defines the menu structure for 
  // the Probes & Floats javascript code. menus is converted to menusObj.
  /*****
   * The Following is the menus JSON structure uncompressed.
   * This can replace the above menus string for debugging.
   *****/
 var menus =  `[
  {
  "dlNumber":1,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldProductGroup",
  "dlName":"Product Group",
  "dlSelectList":"__htmlprbProductGroup",
  "dlList":[
    {"ddSelectionId":"productGroup",
     "ddProductGroupItems": [
      {"ddItem":"Aviation", "selected":false, "value":"grpAviation", "grayed":false},
      {"ddItem":"Alternative Fluids", "selected":false, "value":"grpAlternative", "grayed":false},
      {"ddItem":"Chemical", "selected":false, "value":"grpChemical", "grayed":false},
      {"ddItem":"Diesel", "selected":false, "value":"grpDiesel", "grayed":false},
      {"ddItem":"Gasoline", "selected":true, "value":"grpGasoline", "grayed":false},
      {"ddItem":"Light Oil", "selected":false, "value":"grpLightOil", "grayed":false},
      {"ddItem":"LPG", "selected":false, "value":"grpLPG", "grayed":false},
      {"ddItem":"Heavy Oil", "selected":false, "value":"grpHeavyOil", "grayed":false}
     ]
    }
  ]
  },
  {
  "dlNumber":2,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldProduct",
  "dlName":"Product",
   "dlSelectList":"__htmlprbProduct",
  "dlList":[
    {"ddSelectionId":"grpAviation",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"avtypSelect", "grayed":true},
      {"ddItem":"Aviation Gasoline", "selected":false, "value":"avAviation", "grayed":false},
      {"ddItem":"Jet Fuel (incl JP8)", "selected":false, "value":"avJP8", "grayed":false},
      {"ddItem":"Jet Fuel (JP 10)", "selected":false, "value":"avJP10", "grayed":false}
     ]
    },
    {"ddSelectionId":"grpAlternative",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"aftypSelect", "grayed":true},
      {"ddItem":"Alcohol (<=100% Alcohol)", "selected":false, "value":"afAlcohol", "grayed":false},
      {"ddItem":"Methanol (<=100% Alcohol)", "selected":false, "value":"afMethanol", "grayed":false},
      {"ddItem":"ETBE (<=100% Ether)", "selected":false, "value":"afETBE", "grayed":false},
      {"ddItem":"Ethanol (<=100% Alcohol) includes E85", "selected":false, "value":"afEthanol", "grayed":false},
      {"ddItem":"MTBE (<=100% Ether)", "selected":false, "value":"afMTBE", "grayed":false},
      {"ddItem":"Used Oil", "selected":false, "value":"afUsed", "grayed":false},
      {"ddItem":"Ethylene Glycol", "selected":false, "value":"afEthylglycol", "grayed":false},
      {"ddItem":"Windshield Washer Fluid", "selected":false, "value":"afWindhshield", "grayed":false},
      {"ddItem":"DEF (AdBlue)", "selected":false, "value":"afDEF", "grayed":false},
      {"ddItem":"Fuel Oil #6", "selected":false, "value":"afFuel6", "grayed":false},
      {"ddItem":"Propylene Glycol", "selected":false, "value":"afPropyglycol", "grayed":false},
      {"ddItem":"Methyl Alcohol", "selected":false, "value":"afMethylalc", "grayed":false}
     ]
    },
    {"ddSelectionId":"grpChemical",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"chtypSelect", "grayed":true},
      {"ddItem":"Acetone", "selected":false, "value":"chAcetone", "grayed":false},
      {"ddItem":"Xylene", "selected":false, "value":"chXylene", "grayed":false},
      {"ddItem":"Ethyl Acetate", "selected":false, "value":"chEAcetate", "grayed":false},
      {"ddItem":"Butyl Acetate", "selected":false, "value":"chBAcetate", "grayed":false},
      {"ddItem":"Dichloromethane", "selected":false, "value":"chDichloro", "grayed":false},
      {"ddItem":"Petroleum Naphtha", "selected":false, "value":"chPetroNapht", "grayed":false},
      {"ddItem":"IsoPropyl Alcohol (Isopropanol, IPA, or 2-Propanol)", "selected":false, "value":"chIsopropyl", "grayed":false},
      {"ddItem":"Dimethyl Formamide", "selected":false, "value":"chDiform", "grayed":false},
      {"ddItem":"n-Propyl Acetate", "selected":false, "value":"chNpropyl", "grayed":false},
      {"ddItem":"1-Butanol (also known as butyl alcohol)", "selected":false, "value":"chButanol", "grayed":false},
      {"ddItem":"Methyl Ethyl Ketone", "selected":false, "value":"chMEKetone", "grayed":false},
      {"ddItem":"Ethyl Benzene", "selected":false, "value":"chEBenzene", "grayed":false},
      {"ddItem":"Methyl Isobutyl Ketone", "selected":false, "value":"chMIKetone", "grayed":false}
     ]
    },
    {"ddSelectionId":"grpDiesel",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"dstypSelect", "grayed":true},
      {"ddItem":"Bio Diesel (Low Density)", "selected":false, "value":"dsBiodiesel", "grayed":false},
      {"ddItem":"Diesel (Fuel Oil #2)", "selected":false, "value":"dsDiesel", "grayed":false},
      {"ddItem":"Kerosene (Fuel Oil #1)", "selected":false, "value":"dsKerosene", "grayed":false}
     ]
    },
    {"ddSelectionId":"grpGasoline",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"gstypSelect", "grayed":true},
      {"ddItem":"Gasohol (<=15 Ethanol)", "selected":false, "value":"gsGasohol", "grayed":false},
      {"ddItem":"Gasoline with <= 7% Methanol and 8% TBA", "selected":false, "value":"gsMethanol", "grayed":false},
      {"ddItem":"Gasoline with <= 15% MTBE", "selected":false, "value":"gsMTBE", "grayed":false},
      {"ddItem":"Gasoline with <= 17% TAME", "selected":false, "value":"gsTAME", "grayed":false},
      {"ddItem":"Leaded Gasoline", "selected":false, "value":"gsLeaded", "grayed":false},
      {"ddItem":"Mineral Spirits", "selected":false, "value":"gsMSpirits", "grayed":false},
      {"ddItem":"Premium Unleaded Gasoline", "selected":false, "value":"gsPremium", "grayed":false},
      {"ddItem":"Regular Unleaded", "selected":false, "value":"gsRegular", "grayed":false},
      {"ddItem":"Gasoline with <=15% ETBE", "selected":false, "value":"gsETBE", "grayed":false},
      {"ddItem":"Gasoline with <=12% TBA", "selected":false, "value":"gsTBA", "grayed":false}
     ]
    },
    {"ddSelectionId":"grpLightOil",
     "ddProductGroupItems": [
     {"ddItem":"--Please Select--", "selected":true, "value":"lotypSelect", "grayed":true},
     {"ddItem":"Motor Oil", "selected":false, "value":"loMotoil", "grayed":false},
     {"ddItem":"Gear Oil, 90W", "selected":false, "value":"loGear", "grayed":false},
     {"ddItem":"Transmission Fluid", "selected":false, "value":"loTrans", "grayed":false},
     {"ddItem":"Toluene", "selected":false, "value":"loToluene", "grayed":false}
     ]
    },
    {"ddSelectionId":"grpLPG",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"lptypSelect", "grayed":true},
      {"ddItem":"Liquefied Petroleum Gas (LPG)", "selected":false, "value":"lpLiqpetrogas", "grayed":false},
      {"ddItem":"Propane", "selected":false, "value":"lpPropane", "grayed":false}
     ]
    },
    {"ddSelectionId":"grpHeavyOil",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"hotypSelect", "grayed":true},
      {"ddItem":"Bio Diesel (High Density)", "selected":false, "value":"hoBiodiesel", "grayed":false},
      {"ddItem":"Fuel Oil #4", "selected":false, "value":"hoFueloil", "grayed":false}
     ]
    }
  ]
  },
  {
  "dlNumber":3,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldTankType",
  "dlName":"Tank Type",
  "dlSelectList":"__htmlprbTankType",
  "dlList":[
    {"ddSelectionId":"tankType",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"tnktypSelect", "grayed":true},
      {"ddItem":"AST - Aboveground Storage Tank", "selected":false, "value":"tnktypAST", "grayed":false},
      {"ddItem":"UST - Underground Storage Tank", "selected":false, "value":"tnktypUST", "grayed":false}
     ]
    }
  ]
  },
  {
    "dlNumber":4,
    "dlType":"dropdown",
    "dlFieldName":"__htmlfldLeakDetection",
    "dlName":"Leak Detection",
    "dlSelectList":"__htmlprbLeakDetection",
    "dlList":[
      {"ddSelectionId":"leakDetection",
       "ddProductGroupItems": [
        {"ddItem":"--Please Select--", "selected":true, "value":"lekSelect", "grayed":true},
        {"ddItem":"0.1 GPH or BIR - AccuChart", "selected":false, "value":"lekPt1", "grayed":false},
        {"ddItem":"0.2 GPH or CSLD", "selected":false, "value":"lekPt2", "grayed":false},
        {"ddItem":"No Leak Detection / Inventory Only", "selected":false, "value":"lekNon", "grayed":false}
       ]
      }
    ]
    },
    {
  "dlNumber":5,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldProbeMaterial",
  "dlName":"Probe Material",
  "dlSelectList":"__htmlprbProbeMaterial",
  "dlList":[
    {"ddSelectionId":"probeMaterial",
     "ddProductGroupItems": [
       {"ddItem":"--Please Select--", "selected":true, "value":"matSelect", "grayed":true},
      {"ddItem":"Aluminum", "selected":false, "value":"matAlm", "grayed":false},
      {"ddItem":"Stainless Steel", "selected":false, "value":"matStn", "grayed":false}
     ]
    }
  ]
  },
  {
    "dlNumber":6,
    "dlType":"dropdown",
    "dlFieldName":"__htmlfldCanister",
    "dlName":"Canister Cover",
    "dlSelectList":"__htmlprbCanister",
    "dlList":[
      {"ddSelectionId":"canister",
       "ddProductGroupItems": [
        {"ddItem":"--Please Select--", "selected":true, "value":"canSelect", "grayed":true},
        {"ddItem":"High Grade Polymer", "selected":false, "value":"canHgp", "grayed":false},
        {"ddItem":"Aluminum", "selected":false, "value":"canAlm", "grayed":false},
        {"ddItem":"Stainless", "selected":false, "value":"canStn", "grayed":false}
       ]
      }
    ]
    },
    {
  "dlNumber":7,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldApproval",
  "dlName":"Approval",
  "dlSelectList":"__htmlprbApproval",
  "dlList":[
    {"ddSelectionId":"approval",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"aprvSelect", "grayed":true},
      {"ddItem":"ATEX", "selected":false, "value":"atex", "grayed":false},
      {"ddItem":"UL", "selected":false, "value":"ul", "grayed":false}
     ]
    }
  ]
  },
{
  "dlNumber":8,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldDensity",
  "dlName":"Density",
  "dlSelectList":"__htmlprbDensity",
  "dlList":[
    {"ddSelectionId":"density",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"denSelect", "grayed":true},
      {"ddItem":"Yes", "selected":false, "value":"denYes", "grayed":false},
      {"ddItem":"No", "selected":false, "value":"denNo", "grayed":false}
     ]
    }
  ]
  },
{
  "dlNumber":9,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldWaterDetection",
  "dlName":"Water Detection",
  "dlSelectList":"__htmlprbWaterDetection",
  "dlList":[
    {"ddSelectionId":"waterDetection",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"watSelect", "grayed":true},
      {"ddItem":"Yes", "selected":false, "value":"watYes", "grayed":false},
      {"ddItem":"No", "selected":false, "value":"watNo", "grayed":false}
     ]
    }
  ]
  },
  {
    "dlNumber":10,
    "dlType":"dropdown",
    "dlFieldName":"__htmlfldConnection",
    "dlName":"Console Connection",
    "dlSelectList":"__htmlprbConnection",
    "dlList":[
      {"ddSelectionId":"connection",
       "ddProductGroupItems": [
        {"ddItem":"--Please Select--", "selected":true, "value":"conSelect", "grayed":true},
        {"ddItem":"Wired", "selected":false, "value":"conWired", "grayed":false},
        {"ddItem":"Wireless", "selected":false, "value":"conWireless", "grayed":false}
       ]
      }
    ]
  },
  {
    "dlNumber":11,
    "dlType":"dropdown",
    "dlFieldName":"__htmlfldMeasurement",
    "dlName":"Measurement",
    "dlSelectList":"__htmlprbMeasurement",
    "dlList":[
      {"ddSelectionId":"measurement",
       "ddProductGroupItems": [
        {"ddItem":"--Please Select--", "selected":true, "value":"lthSelect", "grayed":true},
        {"ddItem":"26 Inches", "selected":false, "value":"lth26Inch", "grayed":false},
        {"ddItem":"48 Inches", "selected":false, "value":"lth48Inch", "grayed":false},
        {"ddItem":"60 Inches", "selected":false, "value":"lth60Inch", "grayed":false},
        {"ddItem":"64 Inches", "selected":false, "value":"lth64Inch", "grayed":false},
        {"ddItem":"72 Inches", "selected":false, "value":"lth72Inch", "grayed":false},
        {"ddItem":"84 Inches", "selected":false, "value":"lth84Inch", "grayed":false},
        {"ddItem":"90 Inches", "selected":false, "value":"lth90Inch", "grayed":false},
        {"ddItem":"96 Inches", "selected":false, "value":"lth96Inch", "grayed":false},
        {"ddItem":"108 Inches", "selected":false, "value":"lth108Inch", "grayed":false},
        {"ddItem":"120 Inches", "selected":false, "value":"lth120Inch", "grayed":false},
        {"ddItem":"126 Inches", "selected":false, "value":"lth126Inch", "grayed":false},
        {"ddItem":"132 Inches", "selected":false, "value":"lth132Inch", "grayed":false},
        {"ddItem":"144 Inches", "selected":false, "value":"lth144Inch", "grayed":false},
        {"ddItem":"114 Inches", "selected":false, "value":"lth114Inch", "grayed":false},
        {"ddItem":"2.0 Meter", "selected":false, "value":"lth2Meter", "grayed":false},
        {"ddItem":"2.5 Meter", "selected":false, "value":"lth25Meter", "grayed":false},
        {"ddItem":"3.0 Meter", "selected":false, "value":"lth3Meter", "grayed":false},
        {"ddItem":"2.667 Meter", "selected":false, "value":"lth2667Meter", "grayed":false},
        {"ddItem":"Custom", "selected":false, "value":"lthCust", "grayed":false},
        {"ddItem":"200cm", "selected":false, "value":"lth200cm", "grayed":false},
        {"ddItem":"300cm", "selected":false, "value":"lth300cm", "grayed":false},
        {"ddItem":"400cm", "selected":false, "value":"lth400cm", "grayed":false},
        {"ddItem":"500cm", "selected":false, "value":"lth500cm", "grayed":false},
        {"ddItem":"600cm", "selected":false, "value":"lth600cm", "grayed":false},
        {"ddItem":"700cm", "selected":false, "value":"lth700cm", "grayed":false},
        {"ddItem":"800cm", "selected":false, "value":"lth800cm", "grayed":false},
        {"ddItem":"900cm", "selected":false, "value":"lth900cm", "grayed":false},
        {"ddItem":"1000cm", "selected":false, "value":"lth1000cm", "grayed":false},
        {"ddItem":"1100cm", "selected":false, "value":"lth1100cm", "grayed":false},
        {"ddItem":"1200cm", "selected":false, "value":"lth1200cm", "grayed":false},
        {"ddItem":"1300cm", "selected":false, "value":"lth1300cm", "grayed":false},
        {"ddItem":"1400cm", "selected":false, "value":"lth1400cm", "grayed":false},
        {"ddItem":"1500cm", "selected":false, "value":"lth1500cm", "grayed":false},
        {"ddItem":"5.0-6.5ft (200cm)", "selected":false, "value":"mgflx1", "grayed":false},
        {"ddItem":"6.6-9.8ft (201-300cm)", "selected":false, "value":"mgflx2", "grayed":false},
        {"ddItem":"9.9-13.1ft (301-400cm)", "selected":false, "value":"mgflx3", "grayed":false},
        {"ddItem":"13.2-16.4ft (401-500cm)", "selected":false, "value":"mgflx4", "grayed":false},
        {"ddItem":"16.5-19.6ft (501-600cm)", "selected":false, "value":"mgflx5", "grayed":false},
        {"ddItem":"19.7-22.9ft (601-700cm)", "selected":false, "value":"mgflx6", "grayed":false},
        {"ddItem":"23.0-26.2ft (701-800cm)", "selected":false, "value":"mgflx7", "grayed":false},
        {"ddItem":"26.3-29.5ft (801-900cm)", "selected":false, "value":"mgflx8", "grayed":false},
        {"ddItem":"29.6-32.8ft (901-1000cm)", "selected":false, "value":"mgflx9", "grayed":false},
        {"ddItem":"32.9-36.0ft (1001-1100cm)", "selected":false, "value":"mgflx10", "grayed":false},
        {"ddItem":"36.1-39.3ft (1101-1200cm)", "selected":false, "value":"mgflx11", "grayed":false},
        {"ddItem":"39.4-42.6ft (1201-1300cm)", "selected":false, "value":"mgflx12", "grayed":false},
        {"ddItem":"42.7-45.9ft (1301-1400cm)", "selected":false, "value":"mgflx13", "grayed":false},
        {"ddItem":"46.0-49.2ft (1401-1500cm)", "selected":false, "value":"mgflx14", "grayed":false}
      ]
    }
  ]
  },
  {
  "dlNumber":12,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldFloatSize",
  "dlName":"Float Size",
  "dlSelectList":"__htmlfltFloatSize",
  "dlList":[
    {"ddSelectionId":"floatSize",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"fltszSelect", "grayed":true},
      {"ddItem":"1 Inch", "selected":false, "value":"fltsz1", "grayed":false},
      {"ddItem":"1.5 Inches", "selected":false, "value":"fltsz15", "grayed":false},
      {"ddItem":"2 Inches", "selected":false, "value":"fltsz2", "grayed":false},
      {"ddItem":"3 Inches", "selected":false, "value":"fltsz3", "grayed":false},
      {"ddItem":"4 Inches", "selected":false, "value":"fltsz4", "grayed":false}
     ]
    }
  ]
  },
  {
    "dlNumber":13,
    "dlType":"dropdown",
    "dlFieldName":"__htmlfldFloatType",
    "dlName":"Float Type",
    "dlSelectList":"__htmlfltFloatType",
    "dlList":[
      {"ddSelectionId":"floatType",
       "ddProductGroupItems": [
        {"ddItem":"--Please Select--", "selected":true, "value":"fltSelect", "grayed":true},
        {"ddItem":"Inventory Only - No Water Detection", "selected":false, "value":"fltInv", "grayed":false},
        {"ddItem":"Standard Water Detection", "selected":false, "value":"fltH20", "grayed":false},
        {"ddItem":"Phase Separation", "selected":false, "value":"fltPha", "grayed":false},
        {"ddItem":"Desinty", "selected":false, "value":"fltDen", "grayed":false},
        {"ddItem":"Chem-ISO Inventory Only", "selected":false, "value":"fltIso", "grayed":false},
        {"ddItem":"LPG-ISO Inventory Only", "selected":false, "value":"fltLpg", "grayed":false}
       ]
      }
    ]
    },
  {
  "dlNumber":14,
  "dlType":"dropdown",
  "dlFieldName":"__htmlfldCableLength",
  "dlName":"Cable Length",
  "dlSelectList":"__htmlfltCableLength",
  "dlList":[
    {"ddSelectionId":"cableLength",
     "ddProductGroupItems": [
      {"ddItem":"--Please Select--", "selected":true, "value":"cabLthSelect", "grayed":true},
      {"ddItem":"5 ft Cable", "selected":false, "value":"cabLth5", "grayed":false},
      {"ddItem":"10 ft Cable", "selected":false, "value":"cabLth10", "grayed":false},
      {"ddItem":"20 ft Cable", "selected":false, "value":"cabLth20", "grayed":false}
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
var probeData = `[{"probeId":4,"partNumBase":846360,"active":false,"partItemDesc":"Mag Plus 0.1 GPH In-Tank Probes with Water Detection, ATEX","pNum":"846360-1xx","approvals":"atex","canister":"Aluminum","probeMaterial":"Aluminum","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"101"},{"msr":"lth60Inch","subpart":"102"},{"msr":"lth64Inch","subpart":"103"},{"msr":"lth72Inch","subpart":"104"},{"msr":"lth84Inch","subpart":"105"},{"msr":"lth90Inch","subpart":"106"},{"msr":"lth96Inch","subpart":"107"},{"msr":"lth108Inch","subpart":"108"},{"msr":"lth114Inch","subpart":"117"},{"msr":"lth120Inch","subpart":"109"},{"msr":"lth126Inch","subpart":"110"},{"msr":"lth132Inch","subpart":"111"},{"msr":"lth144Inch","subpart":"112"},{"msr":"lth2Meter","subpart":"113"},{"msr":"lth25Meter","subpart":"114"},{"msr":"lth3Meter","subpart":"115"},{"msr":"lth2667Meter","subpart":"116"},{"msr":"lthCust","subpart":"199"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":16,"partNumBase":846360,"active":false,"partItemDesc":"Mag Plus 0.2 GPH In-Tank Probes with Water Detection, ATEX","pNum":"846360-2xx","approvals":"atex","canister":"Aluminum","probeMaterial":"Aluminum","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"201"},{"msr":"lth60Inch","subpart":"202"},{"msr":"lth64Inch","subpart":"203"},{"msr":"lth72Inch","subpart":"204"},{"msr":"lth84Inch","subpart":"205"},{"msr":"lth90Inch","subpart":"206"},{"msr":"lth96Inch","subpart":"207"},{"msr":"lth108Inch","subpart":"208"},{"msr":"lth114Inch","subpart":"217"},{"msr":"lth120Inch","subpart":"209"},{"msr":"lth126Inch","subpart":"210"},{"msr":"lth132Inch","subpart":"211"},{"msr":"lth144Inch","subpart":"212"},{"msr":"lth2Meter","subpart":"213"},{"msr":"lth25Meter","subpart":"214"},{"msr":"lth3Meter","subpart":"215"},{"msr":"lth2667Meter","subpart":"216"},{"msr":"lthCust","subpart":"299"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":35,"partNumBase":846360,"active":false,"partItemDesc":"Mag-D 0.1 GPH In-Tank Probes with Leak Detection, ATEX","pNum":"846360-7xx","approvals":"atex","canister":"Aluminum","probeMaterial":"Aluminum","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":true,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"701"},{"msr":"lth60Inch","subpart":"702"},{"msr":"lth64Inch","subpart":"703"},{"msr":"lth72Inch","subpart":"704"},{"msr":"lth84Inch","subpart":"705"},{"msr":"lth90Inch","subpart":"706"},{"msr":"lth96Inch","subpart":"707"},{"msr":"lth108Inch","subpart":"708"},{"msr":"lth114Inch","subpart":"717"},{"msr":"lth120Inch","subpart":"709"},{"msr":"lth126Inch","subpart":"710"},{"msr":"lth132Inch","subpart":"711"},{"msr":"lth144Inch","subpart":"712"},{"msr":"lth2Meter","subpart":"713"},{"msr":"lth25Meter","subpart":"714"},{"msr":"lth3Meter","subpart":"715"},{"msr":"lth2667Meter","subpart":"716"},{"msr":"lthCust","subpart":"799"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":44,"partNumBase":846360,"active":false,"partItemDesc":"Mag-D 0.2 GPH In-Tank Probes with Leak Detection, ATEX","pNum":"846360-8xx","approvals":"atex","canister":"Aluminum","probeMaterial":"Aluminum","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":true,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"801"},{"msr":"lth60Inch","subpart":"802"},{"msr":"lth64Inch","subpart":"803"},{"msr":"lth72Inch","subpart":"804"},{"msr":"lth84Inch","subpart":"805"},{"msr":"lth90Inch","subpart":"806"},{"msr":"lth96Inch","subpart":"807"},{"msr":"lth108Inch","subpart":"808"},{"msr":"lth114Inch","subpart":"817"},{"msr":"lth120Inch","subpart":"809"},{"msr":"lth126Inch","subpart":"810"},{"msr":"lth132Inch","subpart":"811"},{"msr":"lth144Inch","subpart":"812"},{"msr":"lth2Meter","subpart":"813"},{"msr":"lth25Meter","subpart":"814"},{"msr":"lth3Meter","subpart":"815"},{"msr":"lth2667Meter","subpart":"816"},{"msr":"lthCust","subpart":"899"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":8,"partNumBase":846361,"active":false,"partItemDesc":"Mag Plus 0.1 GPH In-Tank  Probes for Alternative Fluids, with Water Detection, ATEX","pNum":"846361-1xx","approvals":"atex","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"101"},{"msr":"lth60Inch","subpart":"102"},{"msr":"lth64Inch","subpart":"103"},{"msr":"lth72Inch","subpart":"104"},{"msr":"lth84Inch","subpart":"105"},{"msr":"lth90Inch","subpart":"106"},{"msr":"lth96Inch","subpart":"107"},{"msr":"lth108Inch","subpart":"108"},{"msr":"lth114Inch","subpart":"117"},{"msr":"lth120Inch","subpart":"109"},{"msr":"lth126Inch","subpart":"110"},{"msr":"lth132Inch","subpart":"111"},{"msr":"lth144Inch","subpart":"112"},{"msr":"lth2Meter","subpart":"113"},{"msr":"lth25Meter","subpart":"114"},{"msr":"lth3Meter","subpart":"115"},{"msr":"lth2667Meter","subpart":"116"},{"msr":"lthCust","subpart":"199"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":20,"partNumBase":846361,"active":false,"partItemDesc":"Mag Plus 0.2 GPH In-Tank Probes for Alternative Fluids, with Water Detection, ATEX","pNum":"846361-2xx","approvals":"atex","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"201"},{"msr":"lth60Inch","subpart":"202"},{"msr":"lth64Inch","subpart":"203"},{"msr":"lth72Inch","subpart":"204"},{"msr":"lth84Inch","subpart":"205"},{"msr":"lth90Inch","subpart":"206"},{"msr":"lth96Inch","subpart":"207"},{"msr":"lth108Inch","subpart":"208"},{"msr":"lth114Inch","subpart":"217"},{"msr":"lth120Inch","subpart":"209"},{"msr":"lth126Inch","subpart":"210"},{"msr":"lth132Inch","subpart":"211"},{"msr":"lth144Inch","subpart":"212"},{"msr":"lth2Meter","subpart":"213"},{"msr":"lth25Meter","subpart":"214"},{"msr":"lth3Meter","subpart":"215"},{"msr":"lth2667Meter","subpart":"216"},{"msr":"lthCust","subpart":"299"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":26,"partNumBase":846361,"active":false,"partItemDesc":"Mag Plus In-Tank Inventory Only Probes for Alternative Fluids with Water Detection, ATEX","pNum":"846361-3xx","approvals":"atex","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":true,"tankType":{"ast":true,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"301"},{"msr":"lth60Inch","subpart":"302"},{"msr":"lth64Inch","subpart":"303"},{"msr":"lth72Inch","subpart":"304"},{"msr":"lth84Inch","subpart":"305"},{"msr":"lth90Inch","subpart":"306"},{"msr":"lth96Inch","subpart":"307"},{"msr":"lth108Inch","subpart":"308"},{"msr":"lth114Inch","subpart":"317"},{"msr":"lth120Inch","subpart":"309"},{"msr":"lth126Inch","subpart":"310"},{"msr":"lth132Inch","subpart":"311"},{"msr":"lth144Inch","subpart":"312"},{"msr":"lth2Meter","subpart":"313"},{"msr":"lth25Meter","subpart":"314"},{"msr":"lth3Meter","subpart":"315"},{"msr":"lth2667Meter","subpart":"316"},{"msr":"lthCust","subpart":"399"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":12,"partNumBase":846361,"active":false,"partItemDesc":"Mag Plus 0.1 GPH In-Tank  Probes for Alternative Fluids,  No Water Detection, ATEX","pNum":"846361-4xx","approvals":"atex","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":false,"waterDetection":false,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":true,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"401"},{"msr":"lth60Inch","subpart":"402"},{"msr":"lth64Inch","subpart":"403"},{"msr":"lth72Inch","subpart":"404"},{"msr":"lth84Inch","subpart":"405"},{"msr":"lth90Inch","subpart":"406"},{"msr":"lth96Inch","subpart":"407"},{"msr":"lth108Inch","subpart":"408"},{"msr":"lth114Inch","subpart":"417"},{"msr":"lth120Inch","subpart":"409"},{"msr":"lth126Inch","subpart":"410"},{"msr":"lth132Inch","subpart":"411"},{"msr":"lth144Inch","subpart":"412"},{"msr":"lth2Meter","subpart":"413"},{"msr":"lth25Meter","subpart":"414"},{"msr":"lth3Meter","subpart":"415"},{"msr":"lth2667Meter","subpart":"416"},{"msr":"lthCust","subpart":"499"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":59,"partNumBase":846361,"active":false,"partItemDesc":"Mag Plus 0.2 GPH In-Tank Probes for Alternative Fluids, with No Water Detection, ATEX","pNum":"846361-5xx","approvals":"atex","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":false,"waterDetection":false,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":true,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"both"},{"gauge":"tls4","connect":"both"},{"gauge":"tls350","connect":"both"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"501"},{"msr":"lth60Inch","subpart":"502"},{"msr":"lth64Inch","subpart":"503"},{"msr":"lth72Inch","subpart":"504"},{"msr":"lth84Inch","subpart":"505"},{"msr":"lth90Inch","subpart":"506"},{"msr":"lth96Inch","subpart":"507"},{"msr":"lth108Inch","subpart":"508"},{"msr":"lth114Inch","subpart":"517"},{"msr":"lth120Inch","subpart":"509"},{"msr":"lth126Inch","subpart":"510"},{"msr":"lth132Inch","subpart":"511"},{"msr":"lth144Inch","subpart":"512"},{"msr":"lth2Meter","subpart":"513"},{"msr":"lth25Meter","subpart":"514"},{"msr":"lth3Meter","subpart":"515"},{"msr":"lth2667Meter","subpart":"516"},{"msr":"lthCust","subpart":"599"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":31,"partNumBase":846361,"active":false,"partItemDesc":"Mag Plus In-Tank Inventory Only Probes for Alternative Fluids, with No Water Detection, ATEX","pNum":"846361-6xx","approvals":"atex","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":false,"tankType":{"ast":true,"ust":true},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":true,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":true,"lpPropane":true},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"601"},{"msr":"lth60Inch","subpart":"602"},{"msr":"lth64Inch","subpart":"603"},{"msr":"lth72Inch","subpart":"604"},{"msr":"lth84Inch","subpart":"605"},{"msr":"lth90Inch","subpart":"606"},{"msr":"lth96Inch","subpart":"607"},{"msr":"lth108Inch","subpart":"608"},{"msr":"lth114Inch","subpart":"617"},{"msr":"lth120Inch","subpart":"609"},{"msr":"lth126Inch","subpart":"610"},{"msr":"lth132Inch","subpart":"611"},{"msr":"lth144Inch","subpart":"612"},{"msr":"lth2Meter","subpart":"613"},{"msr":"lth25Meter","subpart":"614"},{"msr":"lth3Meter","subpart":"615"},{"msr":"lth2667Meter","subpart":"616"},{"msr":"lthCust","subpart":"699"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":37,"partNumBase":846361,"active":false,"partItemDesc":"Mag-D 0.1 GPH In-Tank  Probes for Alternative Fluids, with Leak Detection, ATEX","pNum":"846361-7xx","approvals":"atex","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":true,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"701"},{"msr":"lth60Inch","subpart":"702"},{"msr":"lth64Inch","subpart":"703"},{"msr":"lth72Inch","subpart":"704"},{"msr":"lth84Inch","subpart":"705"},{"msr":"lth90Inch","subpart":"706"},{"msr":"lth96Inch","subpart":"707"},{"msr":"lth108Inch","subpart":"708"},{"msr":"lth114Inch","subpart":"717"},{"msr":"lth120Inch","subpart":"709"},{"msr":"lth126Inch","subpart":"710"},{"msr":"lth132Inch","subpart":"711"},{"msr":"lth144Inch","subpart":"712"},{"msr":"lth2Meter","subpart":"713"},{"msr":"lth25Meter","subpart":"714"},{"msr":"lth3Meter","subpart":"715"},{"msr":"lth2667Meter","subpart":"716"},{"msr":"lthCust","subpart":"799"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":46,"partNumBase":846361,"active":false,"partItemDesc":"Mag-D 0.2 GPH In-Tank  Probes for Alternative Fluids, with Leak Detection, ATEX","pNum":"846361-8xx","approvals":"atex","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":true,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"801"},{"msr":"lth60Inch","subpart":"802"},{"msr":"lth64Inch","subpart":"803"},{"msr":"lth72Inch","subpart":"804"},{"msr":"lth84Inch","subpart":"805"},{"msr":"lth90Inch","subpart":"806"},{"msr":"lth96Inch","subpart":"807"},{"msr":"lth108Inch","subpart":"808"},{"msr":"lth114Inch","subpart":"817"},{"msr":"lth120Inch","subpart":"809"},{"msr":"lth126Inch","subpart":"810"},{"msr":"lth132Inch","subpart":"811"},{"msr":"lth144Inch","subpart":"812"},{"msr":"lth2Meter","subpart":"813"},{"msr":"lth25Meter","subpart":"814"},{"msr":"lth3Meter","subpart":"815"},{"msr":"lth2667Meter","subpart":"816"},{"msr":"lthCust","subpart":"899"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":40,"partNumBase":846361,"active":false,"partItemDesc":"Mag-D GPH In-Tank  Probes for Alternative Fluids, No Leak Detection, ATEX","pNum":"846361-9xx","approvals":"atex","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":true,"waterDetection":true,"tankType":{"ast":true,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"901"},{"msr":"lth60Inch","subpart":"902"},{"msr":"lth64Inch","subpart":"903"},{"msr":"lth72Inch","subpart":"904"},{"msr":"lth84Inch","subpart":"905"},{"msr":"lth90Inch","subpart":"906"},{"msr":"lth96Inch","subpart":"907"},{"msr":"lth108Inch","subpart":"908"},{"msr":"lth114Inch","subpart":"917"},{"msr":"lth120Inch","subpart":"909"},{"msr":"lth126Inch","subpart":"910"},{"msr":"lth132Inch","subpart":"911"},{"msr":"lth144Inch","subpart":"912"},{"msr":"lth2Meter","subpart":"913"},{"msr":"lth25Meter","subpart":"914"},{"msr":"lth3Meter","subpart":"915"},{"msr":"lth2667Meter","subpart":"916"},{"msr":"lthCust","subpart":"999"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":3,"partNumBase":846366,"active":false,"partItemDesc":"Mag Plus 0.1 GPH In-Tank HGP Probes with Water Detection, ATEX","pNum":"846366-1xx","approvals":"atex","canister":"HGP","probeMaterial":"Aluminum","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"101"},{"msr":"lth60Inch","subpart":"102"},{"msr":"lth64Inch","subpart":"103"},{"msr":"lth72Inch","subpart":"104"},{"msr":"lth84Inch","subpart":"105"},{"msr":"lth90Inch","subpart":"106"},{"msr":"lth96Inch","subpart":"107"},{"msr":"lth108Inch","subpart":"108"},{"msr":"lth114Inch","subpart":"117"},{"msr":"lth120Inch","subpart":"109"},{"msr":"lth126Inch","subpart":"110"},{"msr":"lth132Inch","subpart":"111"},{"msr":"lth144Inch","subpart":"112"},{"msr":"lth2Meter","subpart":"113"},{"msr":"lth25Meter","subpart":"114"},{"msr":"lth3Meter","subpart":"115"},{"msr":"lth2667Meter","subpart":"116"},{"msr":"lthCust","subpart":"199"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":15,"partNumBase":846366,"active":false,"partItemDesc":"Mag Plus 0.2 GPH In-Tank HGP Probes with Water Detection, ATEX","pNum":"846366-2xx","approvals":"atex","canister":"HGP","probeMaterial":"Aluminum","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"201"},{"msr":"lth60Inch","subpart":"202"},{"msr":"lth64Inch","subpart":"203"},{"msr":"lth72Inch","subpart":"204"},{"msr":"lth84Inch","subpart":"205"},{"msr":"lth90Inch","subpart":"206"},{"msr":"lth96Inch","subpart":"207"},{"msr":"lth108Inch","subpart":"208"},{"msr":"lth114Inch","subpart":"217"},{"msr":"lth120Inch","subpart":"209"},{"msr":"lth126Inch","subpart":"210"},{"msr":"lth132Inch","subpart":"211"},{"msr":"lth144Inch","subpart":"212"},{"msr":"lth2Meter","subpart":"213"},{"msr":"lth25Meter","subpart":"214"},{"msr":"lth3Meter","subpart":"215"},{"msr":"lth2667Meter","subpart":"216"},{"msr":"lthCust","subpart":"299"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":34,"partNumBase":846366,"active":false,"partItemDesc":"Mag-D 0.1 GPH In-Tank HGP Probes with Leak Detection, ATEX","pNum":"846366-7xx","approvals":"atex","canister":"HGP","probeMaterial":"Aluminum","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":true,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"701"},{"msr":"lth60Inch","subpart":"702"},{"msr":"lth64Inch","subpart":"703"},{"msr":"lth72Inch","subpart":"704"},{"msr":"lth84Inch","subpart":"705"},{"msr":"lth90Inch","subpart":"706"},{"msr":"lth96Inch","subpart":"707"},{"msr":"lth108Inch","subpart":"708"},{"msr":"lth114Inch","subpart":"717"},{"msr":"lth120Inch","subpart":"709"},{"msr":"lth126Inch","subpart":"710"},{"msr":"lth132Inch","subpart":"711"},{"msr":"lth144Inch","subpart":"712"},{"msr":"lth2Meter","subpart":"713"},{"msr":"lth25Meter","subpart":"714"},{"msr":"lth3Meter","subpart":"715"},{"msr":"lth2667Meter","subpart":"716"},{"msr":"lthCust","subpart":"799"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":43,"partNumBase":846366,"active":false,"partItemDesc":"Mag-D 0.2 GPH In-Tank HGP Probes with Leak Detection, ATEX","pNum":"846366-8xx","approvals":"atex","canister":"HGP","probeMaterial":"Aluminum","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":true,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"801"},{"msr":"lth60Inch","subpart":"802"},{"msr":"lth64Inch","subpart":"803"},{"msr":"lth72Inch","subpart":"804"},{"msr":"lth84Inch","subpart":"805"},{"msr":"lth90Inch","subpart":"806"},{"msr":"lth96Inch","subpart":"807"},{"msr":"lth108Inch","subpart":"808"},{"msr":"lth114Inch","subpart":"817"},{"msr":"lth120Inch","subpart":"809"},{"msr":"lth126Inch","subpart":"810"},{"msr":"lth132Inch","subpart":"811"},{"msr":"lth144Inch","subpart":"812"},{"msr":"lth2Meter","subpart":"813"},{"msr":"lth25Meter","subpart":"814"},{"msr":"lth3Meter","subpart":"815"},{"msr":"lth2667Meter","subpart":"816"},{"msr":"lthCust","subpart":"899"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":7,"partNumBase":846367,"active":false,"partItemDesc":"Mag Plus 0.1 GPH In-Tank HGP Probes for Alternative Fluids, with Water Detection, ATEX","pNum":"846367-1xx","approvals":"atex","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"101"},{"msr":"lth60Inch","subpart":"102"},{"msr":"lth64Inch","subpart":"103"},{"msr":"lth72Inch","subpart":"104"},{"msr":"lth84Inch","subpart":"105"},{"msr":"lth90Inch","subpart":"106"},{"msr":"lth96Inch","subpart":"107"},{"msr":"lth108Inch","subpart":"108"},{"msr":"lth114Inch","subpart":"117"},{"msr":"lth120Inch","subpart":"109"},{"msr":"lth126Inch","subpart":"110"},{"msr":"lth132Inch","subpart":"111"},{"msr":"lth144Inch","subpart":"112"},{"msr":"lth2Meter","subpart":"113"},{"msr":"lth25Meter","subpart":"114"},{"msr":"lth3Meter","subpart":"115"},{"msr":"lth2667Meter","subpart":"116"},{"msr":"lthCust","subpart":"199"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":19,"partNumBase":846367,"active":false,"partItemDesc":"Mag Plus 0.2 GPH In-Tank HGP Probes for Alternative Fluids, with Water Detection, ATEX","pNum":"846367-2xx","approvals":"atex","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"201"},{"msr":"lth60Inch","subpart":"202"},{"msr":"lth64Inch","subpart":"203"},{"msr":"lth72Inch","subpart":"204"},{"msr":"lth84Inch","subpart":"205"},{"msr":"lth90Inch","subpart":"206"},{"msr":"lth96Inch","subpart":"207"},{"msr":"lth108Inch","subpart":"208"},{"msr":"lth114Inch","subpart":"217"},{"msr":"lth120Inch","subpart":"209"},{"msr":"lth126Inch","subpart":"210"},{"msr":"lth132Inch","subpart":"211"},{"msr":"lth144Inch","subpart":"212"},{"msr":"lth2Meter","subpart":"213"},{"msr":"lth25Meter","subpart":"214"},{"msr":"lth3Meter","subpart":"215"},{"msr":"lth2667Meter","subpart":"216"},{"msr":"lthCust","subpart":"299"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":25,"partNumBase":846367,"active":false,"partItemDesc":"Mag Plus In-Tank Inventory Only HGP Probes for Alternative Fluids, with Water Detection, ATEX","pNum":"846367-3xx","approvals":"atex","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":true,"tankType":{"ast":true,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"301"},{"msr":"lth60Inch","subpart":"302"},{"msr":"lth64Inch","subpart":"303"},{"msr":"lth72Inch","subpart":"304"},{"msr":"lth84Inch","subpart":"305"},{"msr":"lth90Inch","subpart":"306"},{"msr":"lth96Inch","subpart":"307"},{"msr":"lth108Inch","subpart":"308"},{"msr":"lth114Inch","subpart":"317"},{"msr":"lth120Inch","subpart":"309"},{"msr":"lth126Inch","subpart":"310"},{"msr":"lth132Inch","subpart":"311"},{"msr":"lth144Inch","subpart":"312"},{"msr":"lth2Meter","subpart":"313"},{"msr":"lth25Meter","subpart":"314"},{"msr":"lth3Meter","subpart":"315"},{"msr":"lth2667Meter","subpart":"316"},{"msr":"lthCust","subpart":"399"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":11,"partNumBase":846367,"active":false,"partItemDesc":"Mag Plus 0.1 GPH In-Tank HGP Probes for Alternative Fluids,  No Water Detection, ATEX","pNum":"846367-4xx","approvals":"atex","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":false,"waterDetection":false,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":true,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"401"},{"msr":"lth60Inch","subpart":"402"},{"msr":"lth64Inch","subpart":"403"},{"msr":"lth72Inch","subpart":"404"},{"msr":"lth84Inch","subpart":"405"},{"msr":"lth90Inch","subpart":"406"},{"msr":"lth96Inch","subpart":"407"},{"msr":"lth108Inch","subpart":"408"},{"msr":"lth114Inch","subpart":"417"},{"msr":"lth120Inch","subpart":"409"},{"msr":"lth126Inch","subpart":"410"},{"msr":"lth132Inch","subpart":"411"},{"msr":"lth144Inch","subpart":"412"},{"msr":"lth2Meter","subpart":"413"},{"msr":"lth25Meter","subpart":"414"},{"msr":"lth3Meter","subpart":"415"},{"msr":"lth2667Meter","subpart":"416"},{"msr":"lthCust","subpart":"499"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":22,"partNumBase":846367,"active":false,"partItemDesc":"Mag Plus 0.2 GPH In-Tank HGP Probes for Alternative Fluids,  No Water Detection, ATEX","pNum":"846367-5xx","approvals":"atex","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":false,"waterDetection":false,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":true,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"501"},{"msr":"lth60Inch","subpart":"502"},{"msr":"lth64Inch","subpart":"503"},{"msr":"lth72Inch","subpart":"504"},{"msr":"lth84Inch","subpart":"505"},{"msr":"lth90Inch","subpart":"506"},{"msr":"lth96Inch","subpart":"507"},{"msr":"lth108Inch","subpart":"508"},{"msr":"lth114Inch","subpart":"517"},{"msr":"lth120Inch","subpart":"509"},{"msr":"lth126Inch","subpart":"510"},{"msr":"lth132Inch","subpart":"511"},{"msr":"lth144Inch","subpart":"512"},{"msr":"lth2Meter","subpart":"513"},{"msr":"lth25Meter","subpart":"514"},{"msr":"lth3Meter","subpart":"515"},{"msr":"lth2667Meter","subpart":"516"},{"msr":"lthCust","subpart":"599"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":30,"partNumBase":846367,"active":false,"partItemDesc":"Mag Plus In-Tank Inventory Only HGP Probes for Alternative Fluids, with No Water Detection, ATEX","pNum":"846367-6xx","approvals":"atex","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":false,"tankType":{"ast":true,"ust":true},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":true,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":true,"chButanol":true,"chMEKetone":true,"chEBenzene":true,"chMIKetone":true,"chXylene":true,"chEAcetate":true,"chBAcetate":true,"chDichloro":true,"chPetroNapht":true,"chIsopropyl":true,"chDiform":true,"chNpropyl":true,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":true,"lpPropane":true},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"601"},{"msr":"lth60Inch","subpart":"602"},{"msr":"lth64Inch","subpart":"603"},{"msr":"lth72Inch","subpart":"604"},{"msr":"lth84Inch","subpart":"605"},{"msr":"lth90Inch","subpart":"606"},{"msr":"lth96Inch","subpart":"607"},{"msr":"lth108Inch","subpart":"608"},{"msr":"lth114Inch","subpart":"617"},{"msr":"lth120Inch","subpart":"609"},{"msr":"lth126Inch","subpart":"610"},{"msr":"lth132Inch","subpart":"611"},{"msr":"lth144Inch","subpart":"612"},{"msr":"lth2Meter","subpart":"613"},{"msr":"lth25Meter","subpart":"614"},{"msr":"lth3Meter","subpart":"615"},{"msr":"lth2667Meter","subpart":"616"},{"msr":"lthCust","subpart":"699"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":36,"partNumBase":846367,"active":false,"partItemDesc":"Mag-D 0.1 GPH In-Tank HGP Probes for Alternative Fluids, with Leak Detection, ATEX","pNum":"846367-7xx","approvals":"atex","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":true,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"701"},{"msr":"lth60Inch","subpart":"702"},{"msr":"lth64Inch","subpart":"703"},{"msr":"lth72Inch","subpart":"704"},{"msr":"lth84Inch","subpart":"705"},{"msr":"lth90Inch","subpart":"706"},{"msr":"lth96Inch","subpart":"707"},{"msr":"lth108Inch","subpart":"708"},{"msr":"lth114Inch","subpart":"717"},{"msr":"lth120Inch","subpart":"709"},{"msr":"lth126Inch","subpart":"710"},{"msr":"lth132Inch","subpart":"711"},{"msr":"lth144Inch","subpart":"712"},{"msr":"lth2Meter","subpart":"713"},{"msr":"lth25Meter","subpart":"714"},{"msr":"lth3Meter","subpart":"715"},{"msr":"lth2667Meter","subpart":"716"},{"msr":"lthCust","subpart":"799"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":45,"partNumBase":846367,"active":false,"partItemDesc":"Mag-D 0.2 GPH In-Tank HGP Probes for Alternative Fluids, with Leak Detection, ATEX","pNum":"846367-8xx","approvals":"atex","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":true,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"801"},{"msr":"lth60Inch","subpart":"802"},{"msr":"lth64Inch","subpart":"803"},{"msr":"lth72Inch","subpart":"804"},{"msr":"lth84Inch","subpart":"805"},{"msr":"lth90Inch","subpart":"806"},{"msr":"lth96Inch","subpart":"807"},{"msr":"lth108Inch","subpart":"808"},{"msr":"lth114Inch","subpart":"817"},{"msr":"lth120Inch","subpart":"809"},{"msr":"lth126Inch","subpart":"810"},{"msr":"lth132Inch","subpart":"811"},{"msr":"lth144Inch","subpart":"812"},{"msr":"lth2Meter","subpart":"813"},{"msr":"lth25Meter","subpart":"814"},{"msr":"lth3Meter","subpart":"815"},{"msr":"lth2667Meter","subpart":"816"},{"msr":"lthCust","subpart":"899"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":39,"partNumBase":846367,"active":false,"partItemDesc":"Mag-D In-Tank Inventory Only HGP Probes for Alternative Fluids, No Leak Detection, ATEX","pNum":"846367-9xx","approvals":"atex","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":true,"waterDetection":true,"tankType":{"ast":true,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"901"},{"msr":"lth60Inch","subpart":"902"},{"msr":"lth64Inch","subpart":"903"},{"msr":"lth72Inch","subpart":"904"},{"msr":"lth84Inch","subpart":"905"},{"msr":"lth90Inch","subpart":"906"},{"msr":"lth96Inch","subpart":"907"},{"msr":"lth108Inch","subpart":"908"},{"msr":"lth114Inch","subpart":"917"},{"msr":"lth120Inch","subpart":"909"},{"msr":"lth126Inch","subpart":"910"},{"msr":"lth132Inch","subpart":"911"},{"msr":"lth144Inch","subpart":"912"},{"msr":"lth2Meter","subpart":"913"},{"msr":"lth25Meter","subpart":"914"},{"msr":"lth3Meter","subpart":"915"},{"msr":"lth2667Meter","subpart":"916"},{"msr":"lthCust","subpart":"999"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":2,"partNumBase":846390,"active":false,"partItemDesc":"Mag Plus 0.1 GPH In-Tank Probes with Water Detection, UL","pNum":"846390-1xx","approvals":"ul","canister":"Aluminum","probeMaterial":"Aluminum","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"101"},{"msr":"lth60Inch","subpart":"102"},{"msr":"lth64Inch","subpart":"103"},{"msr":"lth72Inch","subpart":"104"},{"msr":"lth84Inch","subpart":"105"},{"msr":"lth90Inch","subpart":"106"},{"msr":"lth96Inch","subpart":"107"},{"msr":"lth108Inch","subpart":"108"},{"msr":"lth114Inch","subpart":"117"},{"msr":"lth120Inch","subpart":"109"},{"msr":"lth126Inch","subpart":"110"},{"msr":"lth132Inch","subpart":"111"},{"msr":"lth144Inch","subpart":"112"},{"msr":"lth2Meter","subpart":"113"},{"msr":"lth25Meter","subpart":"114"},{"msr":"lth3Meter","subpart":"115"},{"msr":"lth2667Meter","subpart":"116"},{"msr":"lthCust","subpart":"199"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":14,"partNumBase":846390,"active":false,"partItemDesc":"Mag Plus 0.2 GPH In-Tank Probes with Water Detection, UL","pNum":"846390-2xx","approvals":"ul","canister":"Aluminum","probeMaterial":"Aluminum","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"201"},{"msr":"lth60Inch","subpart":"202"},{"msr":"lth64Inch","subpart":"203"},{"msr":"lth72Inch","subpart":"204"},{"msr":"lth84Inch","subpart":"205"},{"msr":"lth90Inch","subpart":"206"},{"msr":"lth96Inch","subpart":"207"},{"msr":"lth108Inch","subpart":"208"},{"msr":"lth114Inch","subpart":"217"},{"msr":"lth120Inch","subpart":"209"},{"msr":"lth126Inch","subpart":"210"},{"msr":"lth132Inch","subpart":"211"},{"msr":"lth144Inch","subpart":"212"},{"msr":"lth2Meter","subpart":"213"},{"msr":"lth25Meter","subpart":"214"},{"msr":"lth3Meter","subpart":"215"},{"msr":"lth2667Meter","subpart":"216"},{"msr":"lthCust","subpart":"299"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":6,"partNumBase":846391,"active":false,"partItemDesc":"Mag Plus 0.1 GPH In-Tank  Probes for Alternative Fluids, with Water Detection, UL","pNum":"846391-1xx","approvals":"ul","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"101"},{"msr":"lth60Inch","subpart":"102"},{"msr":"lth64Inch","subpart":"103"},{"msr":"lth72Inch","subpart":"104"},{"msr":"lth84Inch","subpart":"105"},{"msr":"lth90Inch","subpart":"106"},{"msr":"lth96Inch","subpart":"107"},{"msr":"lth108Inch","subpart":"108"},{"msr":"lth114Inch","subpart":"117"},{"msr":"lth120Inch","subpart":"109"},{"msr":"lth126Inch","subpart":"110"},{"msr":"lth132Inch","subpart":"111"},{"msr":"lth144Inch","subpart":"112"},{"msr":"lth2Meter","subpart":"113"},{"msr":"lth25Meter","subpart":"114"},{"msr":"lth3Meter","subpart":"115"},{"msr":"lth2667Meter","subpart":"116"},{"msr":"lthCust","subpart":"199"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":18,"partNumBase":846391,"active":false,"partItemDesc":"Mag Plus 0.2 GPH In-Tank Probes for Alternative Fluids, with Water Detection, UL","pNum":"846391-2xx","approvals":"ul","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"201"},{"msr":"lth60Inch","subpart":"202"},{"msr":"lth64Inch","subpart":"203"},{"msr":"lth72Inch","subpart":"204"},{"msr":"lth84Inch","subpart":"205"},{"msr":"lth90Inch","subpart":"206"},{"msr":"lth96Inch","subpart":"207"},{"msr":"lth108Inch","subpart":"208"},{"msr":"lth114Inch","subpart":"217"},{"msr":"lth120Inch","subpart":"209"},{"msr":"lth126Inch","subpart":"210"},{"msr":"lth132Inch","subpart":"211"},{"msr":"lth144Inch","subpart":"212"},{"msr":"lth2Meter","subpart":"213"},{"msr":"lth25Meter","subpart":"214"},{"msr":"lth3Meter","subpart":"215"},{"msr":"lth2667Meter","subpart":"216"},{"msr":"lthCust","subpart":"299"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":24,"partNumBase":846391,"active":false,"partItemDesc":"Mag Plus In-Tank Inventory Only Probes for Alternative Fluids,  with Water Detection, UL","pNum":"846391-3xx","approvals":"ul","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":true,"tankType":{"ast":true,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"301"},{"msr":"lth60Inch","subpart":"302"},{"msr":"lth64Inch","subpart":"303"},{"msr":"lth72Inch","subpart":"304"},{"msr":"lth84Inch","subpart":"305"},{"msr":"lth90Inch","subpart":"306"},{"msr":"lth96Inch","subpart":"307"},{"msr":"lth108Inch","subpart":"308"},{"msr":"lth114Inch","subpart":"317"},{"msr":"lth120Inch","subpart":"309"},{"msr":"lth126Inch","subpart":"310"},{"msr":"lth132Inch","subpart":"311"},{"msr":"lth144Inch","subpart":"312"},{"msr":"lth2Meter","subpart":"313"},{"msr":"lth25Meter","subpart":"314"},{"msr":"lth3Meter","subpart":"315"},{"msr":"lth2667Meter","subpart":"316"},{"msr":"lthCust","subpart":"399"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":10,"partNumBase":846391,"active":false,"partItemDesc":"Mag Plus 0.1 GPH In-Tank  Probes for Alternative Fluids,  No Water Detection, UL","pNum":"846391-4xx","approvals":"ul","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":false,"waterDetection":false,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":true,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"401"},{"msr":"lth60Inch","subpart":"402"},{"msr":"lth64Inch","subpart":"403"},{"msr":"lth72Inch","subpart":"404"},{"msr":"lth84Inch","subpart":"405"},{"msr":"lth90Inch","subpart":"406"},{"msr":"lth96Inch","subpart":"407"},{"msr":"lth108Inch","subpart":"408"},{"msr":"lth114Inch","subpart":"417"},{"msr":"lth120Inch","subpart":"409"},{"msr":"lth126Inch","subpart":"410"},{"msr":"lth132Inch","subpart":"411"},{"msr":"lth144Inch","subpart":"412"},{"msr":"lth2Meter","subpart":"413"},{"msr":"lth25Meter","subpart":"414"},{"msr":"lth3Meter","subpart":"415"},{"msr":"lth2667Meter","subpart":"416"},{"msr":"lthCust","subpart":"499"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":28,"partNumBase":846391,"active":false,"partItemDesc":"Mag Plus 0.2 GPH  In-Tank Probes for Alternative Fluids with No Water Detection, UL","pNum":"846391-5xx","approvals":"ul","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":false,"waterDetection":false,"tankType":{"ast":true,"ust":true},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":true,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"501"},{"msr":"lth60Inch","subpart":"502"},{"msr":"lth64Inch","subpart":"503"},{"msr":"lth72Inch","subpart":"504"},{"msr":"lth84Inch","subpart":"505"},{"msr":"lth90Inch","subpart":"506"},{"msr":"lth96Inch","subpart":"507"},{"msr":"lth108Inch","subpart":"508"},{"msr":"lth114Inch","subpart":"517"},{"msr":"lth120Inch","subpart":"509"},{"msr":"lth126Inch","subpart":"510"},{"msr":"lth132Inch","subpart":"511"},{"msr":"lth144Inch","subpart":"512"},{"msr":"lth2Meter","subpart":"513"},{"msr":"lth25Meter","subpart":"514"},{"msr":"lth3Meter","subpart":"515"},{"msr":"lth2667Meter","subpart":"516"},{"msr":"lthCust","subpart":"599"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":29,"partNumBase":846391,"active":false,"partItemDesc":"Mag Plus In-Tank Inventory Only Probes for Alternative Fluids, with No Water Detection, UL","pNum":"846391-6xx","approvals":"ul","canister":"Aluminum","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":false,"tankType":{"ast":true,"ust":true},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":true,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":true,"lpPropane":true},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"601"},{"msr":"lth60Inch","subpart":"602"},{"msr":"lth64Inch","subpart":"603"},{"msr":"lth72Inch","subpart":"604"},{"msr":"lth84Inch","subpart":"605"},{"msr":"lth90Inch","subpart":"606"},{"msr":"lth96Inch","subpart":"607"},{"msr":"lth108Inch","subpart":"608"},{"msr":"lth114Inch","subpart":"617"},{"msr":"lth120Inch","subpart":"609"},{"msr":"lth126Inch","subpart":"610"},{"msr":"lth132Inch","subpart":"611"},{"msr":"lth144Inch","subpart":"612"},{"msr":"lth2Meter","subpart":"613"},{"msr":"lth25Meter","subpart":"614"},{"msr":"lth3Meter","subpart":"615"},{"msr":"lth2667Meter","subpart":"616"},{"msr":"lthCust","subpart":"699"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":1,"partNumBase":846396,"active":false,"partItemDesc":"Mag Plus 0.1 GPH In-Tank HGP Probes with Water Detection, UL","pNum":"846396-1xx","approvals":"ul","canister":"HGP","probeMaterial":"Aluminum","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"101"},{"msr":"lth60Inch","subpart":"102"},{"msr":"lth64Inch","subpart":"103"},{"msr":"lth72Inch","subpart":"104"},{"msr":"lth84Inch","subpart":"105"},{"msr":"lth90Inch","subpart":"106"},{"msr":"lth96Inch","subpart":"107"},{"msr":"lth108Inch","subpart":"108"},{"msr":"lth114Inch","subpart":"117"},{"msr":"lth120Inch","subpart":"109"},{"msr":"lth126Inch","subpart":"110"},{"msr":"lth132Inch","subpart":"111"},{"msr":"lth144Inch","subpart":"112"},{"msr":"lth2Meter","subpart":"113"},{"msr":"lth25Meter","subpart":"114"},{"msr":"lth3Meter","subpart":"115"},{"msr":"lth2667Meter","subpart":"116"},{"msr":"lthCust","subpart":"199"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":13,"partNumBase":846396,"active":false,"partItemDesc":"Mag Plus 0.2 GPH In-Tank HGP Probes with Water Detection, UL","pNum":"846396-2xx","approvals":"ul","canister":"HGP","probeMaterial":"Aluminum","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"201"},{"msr":"lth60Inch","subpart":"202"},{"msr":"lth64Inch","subpart":"203"},{"msr":"lth72Inch","subpart":"204"},{"msr":"lth84Inch","subpart":"205"},{"msr":"lth90Inch","subpart":"206"},{"msr":"lth96Inch","subpart":"207"},{"msr":"lth108Inch","subpart":"208"},{"msr":"lth114Inch","subpart":"217"},{"msr":"lth120Inch","subpart":"209"},{"msr":"lth126Inch","subpart":"210"},{"msr":"lth132Inch","subpart":"211"},{"msr":"lth144Inch","subpart":"212"},{"msr":"lth2Meter","subpart":"213"},{"msr":"lth25Meter","subpart":"214"},{"msr":"lth3Meter","subpart":"215"},{"msr":"lth2667Meter","subpart":"216"},{"msr":"lthCust","subpart":"299"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":32,"partNumBase":846396,"active":false,"partItemDesc":"Mag-D 0.1 GPH In-Tank HGP Probes with Leak Detection, UL","pNum":"846396-7xx","approvals":"ul","canister":"HGP","probeMaterial":"Aluminum","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":true,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"701"},{"msr":"lth60Inch","subpart":"702"},{"msr":"lth64Inch","subpart":"703"},{"msr":"lth72Inch","subpart":"704"},{"msr":"lth84Inch","subpart":"705"},{"msr":"lth90Inch","subpart":"706"},{"msr":"lth96Inch","subpart":"707"},{"msr":"lth108Inch","subpart":"708"},{"msr":"lth114Inch","subpart":"717"},{"msr":"lth120Inch","subpart":"709"},{"msr":"lth126Inch","subpart":"710"},{"msr":"lth132Inch","subpart":"711"},{"msr":"lth144Inch","subpart":"712"},{"msr":"lth2Meter","subpart":"713"},{"msr":"lth25Meter","subpart":"714"},{"msr":"lth3Meter","subpart":"715"},{"msr":"lth2667Meter","subpart":"716"},{"msr":"lthCust","subpart":"799"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":41,"partNumBase":846396,"active":false,"partItemDesc":"Mag-D 0.2 GPH In-Tank HGP Probes with Leak Detection, UL","pNum":"846396-8xx","approvals":"ul","canister":"HGP","probeMaterial":"Aluminum","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":true,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"801"},{"msr":"lth60Inch","subpart":"802"},{"msr":"lth64Inch","subpart":"803"},{"msr":"lth72Inch","subpart":"804"},{"msr":"lth84Inch","subpart":"805"},{"msr":"lth90Inch","subpart":"806"},{"msr":"lth96Inch","subpart":"807"},{"msr":"lth108Inch","subpart":"808"},{"msr":"lth114Inch","subpart":"817"},{"msr":"lth120Inch","subpart":"809"},{"msr":"lth126Inch","subpart":"810"},{"msr":"lth132Inch","subpart":"811"},{"msr":"lth144Inch","subpart":"812"},{"msr":"lth2Meter","subpart":"813"},{"msr":"lth25Meter","subpart":"814"},{"msr":"lth3Meter","subpart":"815"},{"msr":"lth2667Meter","subpart":"816"},{"msr":"lthCust","subpart":"899"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":5,"partNumBase":846397,"active":false,"partItemDesc":"Mag Plus 0.1 GPH In-Tank HGP Probes for Alternative Fluids, with Water Detection, UL","pNum":"846397-1xx","approvals":"ul","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"101"},{"msr":"lth60Inch","subpart":"102"},{"msr":"lth64Inch","subpart":"103"},{"msr":"lth72Inch","subpart":"104"},{"msr":"lth84Inch","subpart":"105"},{"msr":"lth90Inch","subpart":"106"},{"msr":"lth96Inch","subpart":"107"},{"msr":"lth108Inch","subpart":"108"},{"msr":"lth114Inch","subpart":"117"},{"msr":"lth120Inch","subpart":"109"},{"msr":"lth126Inch","subpart":"110"},{"msr":"lth132Inch","subpart":"111"},{"msr":"lth144Inch","subpart":"112"},{"msr":"lth2Meter","subpart":"113"},{"msr":"lth25Meter","subpart":"114"},{"msr":"lth3Meter","subpart":"115"},{"msr":"lth2667Meter","subpart":"116"},{"msr":"lthCust","subpart":"199"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":17,"partNumBase":846397,"active":false,"partItemDesc":"Mag Plus 0.2 GPH In-Tank HGP Probes for Alternative Fluids, with Water Detection, UL","pNum":"846397-2xx","approvals":"ul","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":false,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"201"},{"msr":"lth60Inch","subpart":"202"},{"msr":"lth64Inch","subpart":"203"},{"msr":"lth72Inch","subpart":"204"},{"msr":"lth84Inch","subpart":"205"},{"msr":"lth90Inch","subpart":"206"},{"msr":"lth96Inch","subpart":"207"},{"msr":"lth108Inch","subpart":"208"},{"msr":"lth114Inch","subpart":"217"},{"msr":"lth120Inch","subpart":"209"},{"msr":"lth126Inch","subpart":"210"},{"msr":"lth132Inch","subpart":"211"},{"msr":"lth144Inch","subpart":"212"},{"msr":"lth2Meter","subpart":"213"},{"msr":"lth25Meter","subpart":"214"},{"msr":"lth3Meter","subpart":"215"},{"msr":"lth2667Meter","subpart":"216"},{"msr":"lthCust","subpart":"299"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":23,"partNumBase":846397,"active":false,"partItemDesc":"Mag Plus In-Tank Inventory Only HGP Probes with Water Detection, UL","pNum":"846397-3xx","approvals":"ul","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":true,"tankType":{"ast":true,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"301"},{"msr":"lth60Inch","subpart":"302"},{"msr":"lth64Inch","subpart":"303"},{"msr":"lth72Inch","subpart":"304"},{"msr":"lth84Inch","subpart":"305"},{"msr":"lth90Inch","subpart":"306"},{"msr":"lth96Inch","subpart":"307"},{"msr":"lth108Inch","subpart":"308"},{"msr":"lth114Inch","subpart":"317"},{"msr":"lth120Inch","subpart":"309"},{"msr":"lth126Inch","subpart":"310"},{"msr":"lth132Inch","subpart":"311"},{"msr":"lth144Inch","subpart":"312"},{"msr":"lth2Meter","subpart":"313"},{"msr":"lth25Meter","subpart":"314"},{"msr":"lth3Meter","subpart":"315"},{"msr":"lth2667Meter","subpart":"316"},{"msr":"lthCust","subpart":"399"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":9,"partNumBase":846397,"active":false,"partItemDesc":"Mag Plus 0.1 GPH In-Tank HGP Probes for Alternative Fluids,  No Water Detection, UL","pNum":"846397-4xx","approvals":"ul","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":false,"waterDetection":false,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":true,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls4","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"401"},{"msr":"lth60Inch","subpart":"402"},{"msr":"lth64Inch","subpart":"403"},{"msr":"lth72Inch","subpart":"404"},{"msr":"lth84Inch","subpart":"405"},{"msr":"lth90Inch","subpart":"406"},{"msr":"lth96Inch","subpart":"407"},{"msr":"lth108Inch","subpart":"408"},{"msr":"lth114Inch","subpart":"417"},{"msr":"lth120Inch","subpart":"409"},{"msr":"lth126Inch","subpart":"410"},{"msr":"lth132Inch","subpart":"411"},{"msr":"lth144Inch","subpart":"412"},{"msr":"lth2Meter","subpart":"413"},{"msr":"lth25Meter","subpart":"414"},{"msr":"lth3Meter","subpart":"415"},{"msr":"lth2667Meter","subpart":"416"},{"msr":"lthCust","subpart":"499"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":21,"partNumBase":846397,"active":false,"partItemDesc":"Mag Plus 0.2 GPH In-Tank HGP Probes for Alternative Fluids,  No Water Detection, UL","pNum":"846397-5xx","approvals":"ul","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":false,"waterDetection":false,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":true,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"501"},{"msr":"lth60Inch","subpart":"502"},{"msr":"lth64Inch","subpart":"503"},{"msr":"lth72Inch","subpart":"504"},{"msr":"lth84Inch","subpart":"505"},{"msr":"lth90Inch","subpart":"506"},{"msr":"lth96Inch","subpart":"507"},{"msr":"lth108Inch","subpart":"508"},{"msr":"lth114Inch","subpart":"517"},{"msr":"lth120Inch","subpart":"509"},{"msr":"lth126Inch","subpart":"510"},{"msr":"lth132Inch","subpart":"511"},{"msr":"lth144Inch","subpart":"512"},{"msr":"lth2Meter","subpart":"513"},{"msr":"lth25Meter","subpart":"514"},{"msr":"lth3Meter","subpart":"515"},{"msr":"lth2667Meter","subpart":"516"},{"msr":"lthCust","subpart":"599"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":27,"partNumBase":846397,"active":false,"partItemDesc":"Mag Plus In-Tank Inventory Only HGP Probes for Alternative Fluids with No Water Detection, UL","pNum":"846397-6xx","approvals":"ul","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":false,"tankType":{"ast":true,"ust":true},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":true,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":true,"chButanol":true,"chMEKetone":true,"chEBenzene":true,"chMIKetone":true,"chXylene":true,"chEAcetate":true,"chBAcetate":true,"chDichloro":true,"chPetroNapht":true,"chIsopropyl":true,"chDiform":true,"chNpropyl":true,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":true,"lpPropane":true},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"601"},{"msr":"lth60Inch","subpart":"602"},{"msr":"lth64Inch","subpart":"603"},{"msr":"lth72Inch","subpart":"604"},{"msr":"lth84Inch","subpart":"605"},{"msr":"lth90Inch","subpart":"606"},{"msr":"lth96Inch","subpart":"607"},{"msr":"lth108Inch","subpart":"608"},{"msr":"lth114Inch","subpart":"617"},{"msr":"lth120Inch","subpart":"609"},{"msr":"lth126Inch","subpart":"610"},{"msr":"lth132Inch","subpart":"611"},{"msr":"lth144Inch","subpart":"612"},{"msr":"lth2Meter","subpart":"613"},{"msr":"lth25Meter","subpart":"614"},{"msr":"lth3Meter","subpart":"615"},{"msr":"lth2667Meter","subpart":"616"},{"msr":"lthCust","subpart":"699"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":33,"partNumBase":846397,"active":false,"partItemDesc":"Mag-D 0.1 GPH In-Tank HGP Probes for Alternative Fluids, with Leak Detection, UL","pNum":"846397-7xx","approvals":"ul","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":true,"pt2":false,"inventory":false},"density":true,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"701"},{"msr":"lth60Inch","subpart":"702"},{"msr":"lth64Inch","subpart":"703"},{"msr":"lth72Inch","subpart":"704"},{"msr":"lth84Inch","subpart":"705"},{"msr":"lth90Inch","subpart":"706"},{"msr":"lth96Inch","subpart":"707"},{"msr":"lth108Inch","subpart":"708"},{"msr":"lth114Inch","subpart":"717"},{"msr":"lth120Inch","subpart":"709"},{"msr":"lth126Inch","subpart":"710"},{"msr":"lth132Inch","subpart":"711"},{"msr":"lth144Inch","subpart":"712"},{"msr":"lth2Meter","subpart":"713"},{"msr":"lth25Meter","subpart":"714"},{"msr":"lth3Meter","subpart":"715"},{"msr":"lth2667Meter","subpart":"716"},{"msr":"lthCust","subpart":"799"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":42,"partNumBase":846397,"active":false,"partItemDesc":"Mag-D 0.2 GPH In-Tank HGP Probes for Alternative Fluids, with Leak Detection, UL","pNum":"846397-8xx","approvals":"ul","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":true,"inventory":false},"density":true,"waterDetection":true,"tankType":{"ast":false,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"801"},{"msr":"lth60Inch","subpart":"802"},{"msr":"lth64Inch","subpart":"803"},{"msr":"lth72Inch","subpart":"804"},{"msr":"lth84Inch","subpart":"805"},{"msr":"lth90Inch","subpart":"806"},{"msr":"lth96Inch","subpart":"807"},{"msr":"lth108Inch","subpart":"808"},{"msr":"lth114Inch","subpart":"817"},{"msr":"lth120Inch","subpart":"809"},{"msr":"lth126Inch","subpart":"810"},{"msr":"lth132Inch","subpart":"811"},{"msr":"lth144Inch","subpart":"812"},{"msr":"lth2Meter","subpart":"813"},{"msr":"lth25Meter","subpart":"814"},{"msr":"lth3Meter","subpart":"815"},{"msr":"lth2667Meter","subpart":"816"},{"msr":"lthCust","subpart":"899"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":38,"partNumBase":846397,"active":false,"partItemDesc":"Mag-D In-Tank Inventory Only HGP Probes for Alternative Fluids, No Leak Detection, UL","pNum":"846397-9xx","approvals":"ul","canister":"HGP","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":true,"waterDetection":true,"tankType":{"ast":true,"ust":true},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":true,"heavyOil":true,"altFluids":true,"lpg":true,"chemical":true},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"wired"}],"fltInclusive":false,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"901"},{"msr":"lth60Inch","subpart":"902"},{"msr":"lth64Inch","subpart":"903"},{"msr":"lth72Inch","subpart":"904"},{"msr":"lth84Inch","subpart":"905"},{"msr":"lth90Inch","subpart":"906"},{"msr":"lth96Inch","subpart":"907"},{"msr":"lth108Inch","subpart":"908"},{"msr":"lth114Inch","subpart":"917"},{"msr":"lth120Inch","subpart":"909"},{"msr":"lth126Inch","subpart":"910"},{"msr":"lth132Inch","subpart":"911"},{"msr":"lth144Inch","subpart":"912"},{"msr":"lth2Meter","subpart":"913"},{"msr":"lth25Meter","subpart":"914"},{"msr":"lth3Meter","subpart":"915"},{"msr":"lth2667Meter","subpart":"916"},{"msr":"lthCust","subpart":"999"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"--"},{"msr":"mgflx2","subpart":"--"},{"msr":"mgflx3","subpart":"--"},{"msr":"mgflx4","subpart":"--"},{"msr":"mgflx5","subpart":"--"},{"msr":"mgflx6","subpart":"--"},{"msr":"mgflx7","subpart":"--"},{"msr":"mgflx8","subpart":"--"},{"msr":"mgflx9","subpart":"--"},{"msr":"mgflx10","subpart":"--"},{"msr":"mgflx11","subpart":"--"},{"msr":"mgflx12","subpart":"--"},{"msr":"mgflx13","subpart":"--"},{"msr":"mgflx14","subpart":"--"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":50,"partNumBase":889560,"active":false,"partItemDesc":"Mag-FLEX probe with Water and Product Floats for Gasoline Tanks, ATEX, Wireless","pNum":"889560-1xx","approvals":"atex","canister":"Stainless","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":true,"tankType":{"ast":true,"ust":false},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":false,"dsDiesel":false,"dsKerosene":false,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":false,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wireless"},{"gauge":"tls4","connect":"wireless"},{"gauge":"tls350","connect":"both"}],"fltInclusive":true,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"100"},{"msr":"mgflx2","subpart":"101"},{"msr":"mgflx3","subpart":"102"},{"msr":"mgflx4","subpart":"103"},{"msr":"mgflx5","subpart":"104"},{"msr":"mgflx6","subpart":"105"},{"msr":"mgflx7","subpart":"106"},{"msr":"mgflx8","subpart":"107"},{"msr":"mgflx9","subpart":"108"},{"msr":"mgflx10","subpart":"109"},{"msr":"mgflx11","subpart":"110"},{"msr":"mgflx12","subpart":"111"},{"msr":"mgflx13","subpart":"112"},{"msr":"mgflx14","subpart":"113"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":51,"partNumBase":889560,"active":false,"partItemDesc":"Mag-FLEX probe with Water and Product Floats for Diesel Tanks, ATEX, Wireless","pNum":"889560-2xx","approvals":"atex","canister":"Stainless","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":true,"tankType":{"ast":true,"ust":false},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":false,"avJP10":false,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":false,"gsTBA":false,"gsMethanol":false,"gsMTBE":false,"gsTAME":false,"gsLeaded":false,"gsMSpirits":false,"gsPremium":false,"gsRegular":false,"gsETBE":false,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wireless"},{"gauge":"tls4","connect":"wireless"},{"gauge":"tls350","connect":"both"}],"fltInclusive":true,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"200"},{"msr":"mgflx2","subpart":"201"},{"msr":"mgflx3","subpart":"202"},{"msr":"mgflx4","subpart":"203"},{"msr":"mgflx5","subpart":"204"},{"msr":"mgflx6","subpart":"205"},{"msr":"mgflx7","subpart":"206"},{"msr":"mgflx8","subpart":"207"},{"msr":"mgflx9","subpart":"208"},{"msr":"mgflx10","subpart":"209"},{"msr":"mgflx11","subpart":"210"},{"msr":"mgflx12","subpart":"211"},{"msr":"mgflx13","subpart":"212"},{"msr":"mgflx14","subpart":"213"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":52,"partNumBase":889560,"active":false,"partItemDesc":"Mag-FLEX probes with No Water Detection Float, ATEX, Wireless","pNum":"889560-3xx","approvals":"atex","canister":"Stainless","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":false,"tankType":{"ast":true,"ust":false},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wireless"},{"gauge":"tls4","connect":"wireless"},{"gauge":"tls350","connect":"both"}],"fltInclusive":true,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"300"},{"msr":"mgflx2","subpart":"301"},{"msr":"mgflx3","subpart":"302"},{"msr":"mgflx4","subpart":"303"},{"msr":"mgflx5","subpart":"304"},{"msr":"mgflx6","subpart":"305"},{"msr":"mgflx7","subpart":"306"},{"msr":"mgflx8","subpart":"307"},{"msr":"mgflx9","subpart":"308"},{"msr":"mgflx10","subpart":"309"},{"msr":"mgflx11","subpart":"310"},{"msr":"mgflx12","subpart":"311"},{"msr":"mgflx13","subpart":"312"},{"msr":"mgflx14","subpart":"313"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":47,"partNumBase":889560,"active":false,"partItemDesc":"Mag-FLEX probe with Water and Product Floats for Gasoline Tanks, ATEX, Wired","pNum":"889560-4xx","approvals":"atex","canister":"Stainless","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":true,"tankType":{"ast":true,"ust":false},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":false,"dsDiesel":false,"dsKerosene":false,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":false,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"none"}],"fltInclusive":true,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"400"},{"msr":"mgflx2","subpart":"401"},{"msr":"mgflx3","subpart":"402"},{"msr":"mgflx4","subpart":"403"},{"msr":"mgflx5","subpart":"404"},{"msr":"mgflx6","subpart":"405"},{"msr":"mgflx7","subpart":"406"},{"msr":"mgflx8","subpart":"407"},{"msr":"mgflx9","subpart":"408"},{"msr":"mgflx10","subpart":"409"},{"msr":"mgflx11","subpart":"410"},{"msr":"mgflx12","subpart":"411"},{"msr":"mgflx13","subpart":"412"},{"msr":"mgflx14","subpart":"413"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":48,"partNumBase":889560,"active":false,"partItemDesc":"Mag-FLEX probe with Water and Product Floats for Diesel Tanks, ATEX, Wired","pNum":"889560-5xx","approvals":"atex","canister":"Stainless","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":true,"tankType":{"ast":true,"ust":false},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":false,"avJP10":false,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":false,"gsTBA":false,"gsMethanol":false,"gsMTBE":false,"gsTAME":false,"gsLeaded":false,"gsMSpirits":false,"gsPremium":false,"gsRegular":false,"gsETBE":false,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"none"}],"fltInclusive":true,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"500"},{"msr":"mgflx2","subpart":"501"},{"msr":"mgflx3","subpart":"502"},{"msr":"mgflx4","subpart":"503"},{"msr":"mgflx5","subpart":"504"},{"msr":"mgflx6","subpart":"505"},{"msr":"mgflx7","subpart":"506"},{"msr":"mgflx8","subpart":"507"},{"msr":"mgflx9","subpart":"508"},{"msr":"mgflx10","subpart":"509"},{"msr":"mgflx11","subpart":"510"},{"msr":"mgflx12","subpart":"511"},{"msr":"mgflx13","subpart":"512"},{"msr":"mgflx14","subpart":"513"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":49,"partNumBase":889560,"active":false,"partItemDesc":"Mag-FLEX probes with No Water Detection Float, ATEX, Wired","pNum":"889560-6xx","approvals":"atex","canister":"Stainless","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":false,"tankType":{"ast":true,"ust":false},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"none"}],"fltInclusive":true,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"600"},{"msr":"mgflx2","subpart":"601"},{"msr":"mgflx3","subpart":"602"},{"msr":"mgflx4","subpart":"603"},{"msr":"mgflx5","subpart":"604"},{"msr":"mgflx6","subpart":"605"},{"msr":"mgflx7","subpart":"606"},{"msr":"mgflx8","subpart":"607"},{"msr":"mgflx9","subpart":"608"},{"msr":"mgflx10","subpart":"609"},{"msr":"mgflx11","subpart":"610"},{"msr":"mgflx12","subpart":"611"},{"msr":"mgflx13","subpart":"612"},{"msr":"mgflx14","subpart":"613"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":56,"partNumBase":889590,"active":false,"partItemDesc":"Mag-FLEX probe with Water and Product Floats for Gasoline Tanks, UL, Wireless","pNum":"889590-1xx","approvals":"ul","canister":"Stainless","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":true,"tankType":{"ast":true,"ust":false},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":false,"dsDiesel":false,"dsKerosene":false,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":false,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wireless"},{"gauge":"tls4","connect":"wireless"},{"gauge":"tls350","connect":"both"}],"fltInclusive":true,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"100"},{"msr":"mgflx2","subpart":"101"},{"msr":"mgflx3","subpart":"102"},{"msr":"mgflx4","subpart":"103"},{"msr":"mgflx5","subpart":"104"},{"msr":"mgflx6","subpart":"105"},{"msr":"mgflx7","subpart":"106"},{"msr":"mgflx8","subpart":"107"},{"msr":"mgflx9","subpart":"108"},{"msr":"mgflx10","subpart":"109"},{"msr":"mgflx11","subpart":"110"},{"msr":"mgflx12","subpart":"111"},{"msr":"mgflx13","subpart":"112"},{"msr":"mgflx14","subpart":"113"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":57,"partNumBase":889590,"active":false,"partItemDesc":"Mag-FLEX probe with Water and Product Floats for Diesel Tanks, UL, Wireless","pNum":"889590-2xx","approvals":"ul","canister":"Stainless","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":true,"tankType":{"ast":true,"ust":false},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":false,"avJP10":false,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":false,"gsTBA":false,"gsMethanol":false,"gsMTBE":false,"gsTAME":false,"gsLeaded":false,"gsMSpirits":false,"gsPremium":false,"gsRegular":false,"gsETBE":false,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wireless"},{"gauge":"tls4","connect":"wireless"},{"gauge":"tls350","connect":"both"}],"fltInclusive":true,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"200"},{"msr":"mgflx2","subpart":"201"},{"msr":"mgflx3","subpart":"202"},{"msr":"mgflx4","subpart":"203"},{"msr":"mgflx5","subpart":"204"},{"msr":"mgflx6","subpart":"205"},{"msr":"mgflx7","subpart":"206"},{"msr":"mgflx8","subpart":"207"},{"msr":"mgflx9","subpart":"208"},{"msr":"mgflx10","subpart":"209"},{"msr":"mgflx11","subpart":"210"},{"msr":"mgflx12","subpart":"211"},{"msr":"mgflx13","subpart":"212"},{"msr":"mgflx14","subpart":"213"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":58,"partNumBase":889590,"active":false,"partItemDesc":"Mag-FLEX probes with No Water Detection Float, UL, Wireless","pNum":"889590-3xx","approvals":"ul","canister":"Stainless","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":false,"tankType":{"ast":true,"ust":false},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wireless"},{"gauge":"tls4","connect":"wireless"},{"gauge":"tls350","connect":"both"}],"fltInclusive":true,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"300"},{"msr":"mgflx2","subpart":"301"},{"msr":"mgflx3","subpart":"302"},{"msr":"mgflx4","subpart":"303"},{"msr":"mgflx5","subpart":"304"},{"msr":"mgflx6","subpart":"305"},{"msr":"mgflx7","subpart":"306"},{"msr":"mgflx8","subpart":"307"},{"msr":"mgflx9","subpart":"308"},{"msr":"mgflx10","subpart":"309"},{"msr":"mgflx11","subpart":"310"},{"msr":"mgflx12","subpart":"311"},{"msr":"mgflx13","subpart":"312"},{"msr":"mgflx14","subpart":"313"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":53,"partNumBase":889590,"active":false,"partItemDesc":"Mag-FLEX probe with Water and Product Floats for Gasoline Tanks, UL, Wired","pNum":"889590-4xx","approvals":"ul","canister":"Stainless","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":true,"tankType":{"ast":true,"ust":false},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":false,"dsDiesel":false,"dsKerosene":false,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":false,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"none"}],"fltInclusive":true,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"400"},{"msr":"mgflx2","subpart":"401"},{"msr":"mgflx3","subpart":"402"},{"msr":"mgflx4","subpart":"403"},{"msr":"mgflx5","subpart":"404"},{"msr":"mgflx6","subpart":"405"},{"msr":"mgflx7","subpart":"406"},{"msr":"mgflx8","subpart":"407"},{"msr":"mgflx9","subpart":"408"},{"msr":"mgflx10","subpart":"409"},{"msr":"mgflx11","subpart":"410"},{"msr":"mgflx12","subpart":"411"},{"msr":"mgflx13","subpart":"412"},{"msr":"mgflx14","subpart":"413"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":54,"partNumBase":889590,"active":false,"partItemDesc":"Mag-FLEX probe with Water and Product Floats for Diesel Tanks, UL, Wired","pNum":"889590-5xx","approvals":"ul","canister":"Stainless","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":true,"tankType":{"ast":true,"ust":false},"prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":false,"avJP10":false,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":false,"gsTBA":false,"gsMethanol":false,"gsMTBE":false,"gsTAME":false,"gsLeaded":false,"gsMSpirits":false,"gsPremium":false,"gsRegular":false,"gsETBE":false,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"none"}],"fltInclusive":true,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"500"},{"msr":"mgflx2","subpart":"501"},{"msr":"mgflx3","subpart":"502"},{"msr":"mgflx4","subpart":"503"},{"msr":"mgflx5","subpart":"504"},{"msr":"mgflx6","subpart":"505"},{"msr":"mgflx7","subpart":"506"},{"msr":"mgflx8","subpart":"507"},{"msr":"mgflx9","subpart":"508"},{"msr":"mgflx10","subpart":"509"},{"msr":"mgflx11","subpart":"510"},{"msr":"mgflx12","subpart":"511"},{"msr":"mgflx13","subpart":"512"},{"msr":"mgflx14","subpart":"513"}],"customMinmsr":24,"customMaxmsr":144},{"probeId":55,"partNumBase":889590,"active":false,"partItemDesc":"Mag-FLEX probes with No Water Detection Float, UL, Wired","pNum":"889590-6xx","approvals":"ul","canister":"Stainless","probeMaterial":"Stainless","leakDetectionSupport":{"pt1":false,"pt2":false,"inventory":true},"density":false,"waterDetection":false,"tankType":{"ast":true,"ust":false},"prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":false,"avAviation":true,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"support":[{"gauge":"tls450","connect":"wired"},{"gauge":"tls4","connect":"wired"},{"gauge":"tls350","connect":"none"}],"fltInclusive":true,"prbLth":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"},{"msr":"mgflx1","subpart":"600"},{"msr":"mgflx2","subpart":"601"},{"msr":"mgflx3","subpart":"602"},{"msr":"mgflx4","subpart":"603"},{"msr":"mgflx5","subpart":"604"},{"msr":"mgflx6","subpart":"605"},{"msr":"mgflx7","subpart":"606"},{"msr":"mgflx8","subpart":"607"},{"msr":"mgflx9","subpart":"608"},{"msr":"mgflx10","subpart":"609"},{"msr":"mgflx11","subpart":"610"},{"msr":"mgflx12","subpart":"611"},{"msr":"mgflx13","subpart":"612"},{"msr":"mgflx14","subpart":"613"}],"customMinmsr":24,"customMaxmsr":144}]`;


/* floatData is compressed JSON file generated from an excel csv file and 
 * converted to JSON 
 *  using the web site http://www.convertcsv.com/csv-to-json.htm.  The generated json is compressed
 *  using the web site https://codebeautify.org/jsonminifier. The JSON data is converted to a JS 
 *  object below.
 */
  var floatData = `[{"floatId":1,"partNumBase":846400,"supported":true,"active":false,"partItemDesc":"Mag Plus In-Tank Probe Installation Kit - Gasoline","prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":false,"avJP10":false,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":false,"dsDiesel":false,"dsKerosene":false,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":false,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"flttyp":{"name":"fltH20"},"tankType":{"ast":true,"ust":true},"rcap":[{"name":"rcapNon"},{"name":"--"},{"name":"--"}],"fltsz":[{"name":"fltsz4"},{"name":"fltsz2"},{"name":"--"},{"name":"fltsz3"},{"name":"--"}],"waterDetection":true,"cab":[{"lth":"cabLth5","id":0},{"lth":"cabLth10","id":1},{"lth":"cabLth20","id":"2"}],"prbmsr":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"}]},{"floatId":2,"partNumBase":846400,"supported":true,"active":false,"partItemDesc":"Mag Plus In-Tank Probe Installation Kit - Diesel","prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":true,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":true,"dsDiesel":true,"dsKerosene":true,"gsGasohol":false,"gsTBA":false,"gsMethanol":false,"gsMTBE":false,"gsTAME":false,"gsLeaded":false,"gsMSpirits":false,"gsPremium":false,"gsRegular":false,"gsETBE":false,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":false,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"flttyp":{"name":"fltH20"},"tankType":{"ast":true,"ust":true},"rcap":[{"name":"rcapNon"},{"name":"--"},{"name":"--"}],"fltsz":[{"name":"fltsz4"},{"name":"fltsz2"},{"name":"--"},{"name":"fltsz3"},{"name":"--"}],"waterDetection":true,"cab":[{"lth":"cabLth5","id":0},{"lth":"cabLth10","id":1},{"lth":"cabLth20","id":"2"}],"prbmsr":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"}]},{"floatId":3,"partNumBase":846400,"supported":true,"active":false,"partItemDesc":"Mag Plus In-Tank Probe Installation Kit - Alternative Fluid","prd":{"afAlcohol":true,"afFuel6":true,"afPropyglycol":true,"afMethylalc":true,"afMethanol":true,"afETBE":true,"afEthanol":true,"afMTBE":true,"afUsed":true,"afEthylglycol":true,"afWindhshield":true,"afDEF":true,"avAviation":false,"avJP8":false,"avJP10":false,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":false,"dsDiesel":false,"dsKerosene":false,"gsGasohol":false,"gsTBA":false,"gsMethanol":false,"gsMTBE":false,"gsTAME":false,"gsLeaded":false,"gsMSpirits":false,"gsPremium":false,"gsRegular":false,"gsETBE":false,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":false,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":true,"lpg":false,"chemical":false},"flttyp":{"name":"fltInv"},"tankType":{"ast":true,"ust":true},"rcap":[{"name":"rcapNon"},{"name":"--"},{"name":"--"}],"fltsz":[{"name":"fltsz4"},{"name":"fltsz2"},{"name":"--"},{"name":"fltsz3"},{"name":"--"}],"waterDetection":false,"cab":[{"lth":"cabLth5","id":0},{"lth":"cabLth10","id":1},{"lth":"cabLth20","id":"2"}],"prbmsr":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"}]},{"floatId":4,"partNumBase":846400,"supported":true,"active":false,"partItemDesc":"Mag Plus In-Tank Probe Installation Kit - Light Oil","prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":false,"avJP10":false,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":false,"dsDiesel":false,"dsKerosene":false,"gsGasohol":false,"gsTBA":false,"gsMethanol":false,"gsMTBE":false,"gsTAME":false,"gsLeaded":false,"gsMSpirits":false,"gsPremium":false,"gsRegular":false,"gsETBE":false,"loMotoil":true,"loGear":true,"loTrans":true,"loToluene":true,"hoBiodiesel":false,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":true,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"flttyp":{"name":"fltH20"},"tankType":{"ast":true,"ust":true},"rcap":[{"name":"rcapNon"},{"name":"--"},{"name":"--"}],"fltsz":[{"name":"fltsz4"},{"name":"fltsz2"},{"name":"--"},{"name":"fltsz3"},{"name":"--"}],"waterDetection":true,"cab":[{"lth":"cabLth5","id":0},{"lth":"cabLth10","id":1},{"lth":"cabLth20","id":"2"}],"prbmsr":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"}]},{"floatId":5,"partNumBase":846400,"supported":true,"active":false,"partItemDesc":"Mag Plus In-Tank Probe Installation Kit - Heavy Oil","prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":false,"avJP10":false,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":false,"dsDiesel":false,"dsKerosene":false,"gsGasohol":false,"gsTBA":false,"gsMethanol":false,"gsMTBE":false,"gsTAME":false,"gsLeaded":false,"gsMSpirits":false,"gsPremium":false,"gsRegular":false,"gsETBE":false,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":true,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":true,"altFluids":false,"lpg":false,"chemical":false},"flttyp":{"name":"fltH20"},"tankType":{"ast":true,"ust":true},"rcap":[{"name":"rcapNon"},{"name":"--"},{"name":"--"}],"fltsz":[{"name":"fltsz4"},{"name":"fltsz2"},{"name":"--"},{"name":"fltsz3"},{"name":"--"}],"waterDetection":true,"cab":[{"lth":"cabLth5","id":0},{"lth":"cabLth10","id":1},{"lth":"cabLth20","id":"2"}],"prbmsr":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"}]},{"floatId":6,"partNumBase":886001,"supported":true,"active":false,"partItemDesc":"Mag-D In-Tank Probe Installation Kit - Gasoline","prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":false,"avJP10":false,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":false,"dsDiesel":false,"dsKerosene":false,"gsGasohol":false,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":false,"gsPremium":true,"gsRegular":false,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":false,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"flttyp":{"name":"fltDen"},"tankType":{"ast":true,"ust":true},"rcap":[{"name":"rcapNon"},{"name":"--"},{"name":"--"}],"fltsz":[{"name":"--"},{"name":"fltsz2"},{"name":"--"},{"name":"--"},{"name":"--"}],"waterDetection":true,"cab":[{"lth":"cabLth5","id":0},{"lth":"cabLth10","id":1},{"lth":"cabLth20","id":"2"}],"prbmsr":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"}]},{"floatId":7,"partNumBase":886001,"supported":true,"active":false,"partItemDesc":"Mag-D In-Tank Probe Installation Kit - Diesel","prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":true,"avJP10":false,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":false,"dsDiesel":true,"dsKerosene":true,"gsGasohol":false,"gsTBA":false,"gsMethanol":false,"gsMTBE":false,"gsTAME":false,"gsLeaded":false,"gsMSpirits":false,"gsPremium":false,"gsRegular":false,"gsETBE":false,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":false,"hoFueloil":true,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":true,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"flttyp":{"name":"fltDen"},"tankType":{"ast":true,"ust":true},"rcap":[{"name":"rcapNon"},{"name":"--"},{"name":"--"}],"fltsz":[{"name":"--"},{"name":"fltsz2"},{"name":"--"},{"name":"--"},{"name":"--"}],"waterDetection":true,"cab":[{"lth":"cabLth5","id":0},{"lth":"cabLth10","id":1},{"lth":"cabLth20","id":"2"}],"prbmsr":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"}]},{"floatId":8,"partNumBase":33308,"supported":true,"active":false,"partItemDesc":"LPG-ISO Probe Installation Kit for use with Mag Plus Inventory Only probes","prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":false,"avJP8":false,"avJP10":false,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":false,"dsDiesel":false,"dsKerosene":false,"gsGasohol":false,"gsTBA":false,"gsMethanol":false,"gsMTBE":false,"gsTAME":false,"gsLeaded":false,"gsMSpirits":false,"gsPremium":false,"gsRegular":false,"gsETBE":false,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":false,"hoFueloil":false,"lpLiqpetrogas":true,"lpPropane":true},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":true,"chemical":false},"flttyp":{"name":"fltLpg"},"tankType":{"ast":true,"ust":true},"rcap":[{"name":"rcapNon"},{"name":"--"},{"name":"--"}],"fltsz":[{"name":"--"},{"name":"--"},{"name":"fltsz2"},{"name":"fltsz15"},{"name":"--"}],"waterDetection":true,"cab":[{"lth":"cabLth5","id":1},{"lth":"cabLth10","id":2},{"lth":"--","id":"--"}],"prbmsr":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"01"},{"msr":"lth60Inch","subpart":"02"},{"msr":"lth64Inch","subpart":"03"},{"msr":"lth72Inch","subpart":"04"},{"msr":"lth84Inch","subpart":"05"},{"msr":"lth90Inch","subpart":"06"},{"msr":"lth96Inch","subpart":"07"},{"msr":"lth108Inch","subpart":"08"},{"msr":"lth114Inch","subpart":"17"},{"msr":"lth120Inch","subpart":"09"},{"msr":"lth126Inch","subpart":"10"},{"msr":"lth132Inch","subpart":"11"},{"msr":"lth144Inch","subpart":"12"},{"msr":"lth2Meter","subpart":"13"},{"msr":"lth25Meter","subpart":"14"},{"msr":"lth3Meter","subpart":"15"},{"msr":"lth2667Meter","subpart":"16"},{"msr":"lthCust","subpart":"99"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"}]},{"floatId":9,"partNumBase":331824,"supported":true,"active":false,"partItemDesc":"Chem-ISO Probe Installation Kit for use with Mag Plus Inventory Only probes","prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":true,"avAviation":false,"avJP8":false,"avJP10":false,"chAcetone":true,"chButanol":true,"chMEKetone":true,"chEBenzene":true,"chMIKetone":true,"chXylene":true,"chEAcetate":true,"chBAcetate":true,"chDichloro":true,"chPetroNapht":true,"chIsopropyl":true,"chDiform":true,"chNpropyl":true,"dsBiodiesel":false,"dsDiesel":false,"dsKerosene":false,"gsGasohol":false,"gsTBA":false,"gsMethanol":false,"gsMTBE":false,"gsTAME":false,"gsLeaded":false,"gsMSpirits":false,"gsPremium":false,"gsRegular":false,"gsETBE":false,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":false,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":false,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":true},"flttyp":{"name":"fltIso"},"tankType":{"ast":true,"ust":true},"rcap":[{"name":"rcapNon"},{"name":"--"},{"name":"--"}],"fltsz":[{"name":"--"},{"name":"--"},{"name":"fltsz2"},{"name":"--"},{"name":"--"}],"waterDetection":true,"cab":[{"lth":"cabLth5","id":1},{"lth":"cabLth10","id":2},{"lth":"cabLth20","id":"3"}],"prbmsr":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"01"},{"msr":"lth60Inch","subpart":"02"},{"msr":"lth64Inch","subpart":"03"},{"msr":"lth72Inch","subpart":"04"},{"msr":"lth84Inch","subpart":"05"},{"msr":"lth90Inch","subpart":"06"},{"msr":"lth96Inch","subpart":"07"},{"msr":"lth108Inch","subpart":"08"},{"msr":"lth114Inch","subpart":"17"},{"msr":"lth120Inch","subpart":"09"},{"msr":"lth126Inch","subpart":"10"},{"msr":"lth132Inch","subpart":"11"},{"msr":"lth144Inch","subpart":"12"},{"msr":"lth2Meter","subpart":"13"},{"msr":"lth25Meter","subpart":"14"},{"msr":"lth3Meter","subpart":"15"},{"msr":"lth2667Meter","subpart":"16"},{"msr":"lthCust","subpart":"99"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"}]},{"floatId":10,"partNumBase":886100,"supported":true,"active":false,"partItemDesc":"Mag Plus, Phase-Two Water Detector, 4 in. Float","prd":{"afAlcohol":false,"afFuel6":false,"afPropyglycol":false,"afMethylalc":false,"afMethanol":false,"afETBE":false,"afEthanol":false,"afMTBE":false,"afUsed":false,"afEthylglycol":false,"afWindhshield":false,"afDEF":false,"avAviation":true,"avJP8":false,"avJP10":false,"chAcetone":false,"chButanol":false,"chMEKetone":false,"chEBenzene":false,"chMIKetone":false,"chXylene":false,"chEAcetate":false,"chBAcetate":false,"chDichloro":false,"chPetroNapht":false,"chIsopropyl":false,"chDiform":false,"chNpropyl":false,"dsBiodiesel":false,"dsDiesel":false,"dsKerosene":false,"gsGasohol":true,"gsTBA":true,"gsMethanol":true,"gsMTBE":true,"gsTAME":true,"gsLeaded":true,"gsMSpirits":true,"gsPremium":true,"gsRegular":true,"gsETBE":true,"loMotoil":false,"loGear":false,"loTrans":false,"loToluene":false,"hoBiodiesel":false,"hoFueloil":false,"lpLiqpetrogas":false,"lpPropane":false},"product":{"gasoline":true,"diesel":false,"lightOil":false,"heavyOil":false,"altFluids":false,"lpg":false,"chemical":false},"flttyp":{"name":"fltPha"},"tankType":{"ast":true,"ust":true},"rcap":[{"name":"rcapNon"},{"name":"--"},{"name":"--"}],"fltsz":[{"name":"fltsz4"},{"name":"--"},{"name":"--"},{"name":"--"},{"name":"--"}],"waterDetection":true,"cab":[{"lth":"cabLth5","id":0},{"lth":"cabLth10","id":1},{"lth":"cabLth20","id":"2"}],"prbmsr":[{"msr":"lth26Inch","subpart":"--"},{"msr":"lth48Inch","subpart":"--"},{"msr":"lth60Inch","subpart":"--"},{"msr":"lth64Inch","subpart":"--"},{"msr":"lth72Inch","subpart":"--"},{"msr":"lth84Inch","subpart":"--"},{"msr":"lth90Inch","subpart":"--"},{"msr":"lth96Inch","subpart":"--"},{"msr":"lth108Inch","subpart":"--"},{"msr":"lth114Inch","subpart":"--"},{"msr":"lth120Inch","subpart":"--"},{"msr":"lth126Inch","subpart":"--"},{"msr":"lth132Inch","subpart":"--"},{"msr":"lth144Inch","subpart":"--"},{"msr":"lth2Meter","subpart":"--"},{"msr":"lth25Meter","subpart":"--"},{"msr":"lth3Meter","subpart":"--"},{"msr":"lth2667Meter","subpart":"--"},{"msr":"lthCust","subpart":"--"},{"msr":"lth200cm","subpart":"--"},{"msr":"lth300cm","subpart":"--"},{"msr":"lth400cm","subpart":"--"},{"msr":"lth500cm","subpart":"--"},{"msr":"lth600cm","subpart":"--"},{"msr":"lth700cm","subpart":"--"},{"msr":"lth800cm","subpart":"--"},{"msr":"lth900cm","subpart":"--"},{"msr":"lth1000cm","subpart":"--"},{"msr":"lth1100cm","subpart":"--"},{"msr":"lth1200cm","subpart":"--"},{"msr":"lth1300cm","subpart":"--"},{"msr":"lth1400cm","subpart":"--"},{"msr":"lth1500cm","subpart":"--"}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]},{"floatId":null,"partNumBase":null,"supported":null,"active":null,"partItemDesc":"","prd":{"afAlcohol":null,"afFuel6":null,"afPropyglycol":null,"afMethylalc":null,"afMethanol":null,"afETBE":null,"afEthanol":null,"afMTBE":null,"afUsed":null,"afEthylglycol":null,"afWindhshield":null,"afDEF":null,"avAviation":null,"avJP8":null,"avJP10":null,"chAcetone":null,"chButanol":null,"chMEKetone":null,"chEBenzene":null,"chMIKetone":null,"chXylene":null,"chEAcetate":null,"chBAcetate":null,"chDichloro":null,"chPetroNapht":null,"chIsopropyl":null,"chDiform":null,"chNpropyl":null,"dsBiodiesel":null,"dsDiesel":null,"dsKerosene":null,"gsGasohol":null,"gsTBA":null,"gsMethanol":null,"gsMTBE":null,"gsTAME":null,"gsLeaded":null,"gsMSpirits":null,"gsPremium":null,"gsRegular":null,"gsETBE":null,"loMotoil":null,"loGear":null,"loTrans":null,"loToluene":null,"hoBiodiesel":null,"hoFueloil":null,"lpLiqpetrogas":null,"lpPropane":null},"product":{"gasoline":null,"diesel":null,"lightOil":null,"heavyOil":null,"altFluids":null,"lpg":null,"chemical":null},"flttyp":{"name":""},"tankType":{"ast":null,"ust":null},"rcap":[{"name":""},{"name":""},{"name":""}],"fltsz":[{"name":""},{"name":""},{"name":""},{"name":""},{"name":""}],"waterDetection":null,"cab":[{"lth":"","id":null},{"lth":"","id":null},{"lth":"","id":""}],"prbmsr":[{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""},{"msr":"","subpart":""}]}]`;

var leakDetectionData = `[{"fuelId":1,"product":"afAlcohol","supported":true},{"fuelId":2,"product":"afFuel6","supported":false},{"fuelId":3,"product":"afPropyglycol","supported":false},{"fuelId":4,"product":"afMethylalc","supported":false},{"fuelId":5,"product":"afMethanol","supported":true},{"fuelId":6,"product":"afETBE","supported":true},{"fuelId":7,"product":"afEthanol","supported":true},{"fuelId":8,"product":"afMTBE","supported":true},{"fuelId":9,"product":"afUsed","supported":true},{"fuelId":10,"product":"afEthylglycol","supported":false},{"fuelId":11,"product":"afWindhshield","supported":false},{"fuelId":12,"product":"afDEF","supported":false},{"fuelId":13,"product":"avAviation","supported":true},{"fuelId":14,"product":"avJP8","supported":true},{"fuelId":15,"product":"avJP10","supported":true},{"fuelId":16,"product":"chAcetone","supported":false},{"fuelId":17,"product":"chButanol","supported":false},{"fuelId":18,"product":"chMEKetone","supported":false},{"fuelId":19,"product":"chEBenzene","supported":false},{"fuelId":20,"product":"chMIKetone","supported":false},{"fuelId":21,"product":"chXylene","supported":false},{"fuelId":22,"product":"chEAcetate","supported":false},{"fuelId":23,"product":"chBAcetate","supported":false},{"fuelId":24,"product":"chDichloro","supported":false},{"fuelId":25,"product":"chPetroNapht","supported":false},{"fuelId":26,"product":"chIsopropyl","supported":false},{"fuelId":27,"product":"chDiform","supported":false},{"fuelId":28,"product":"chNpropyl","supported":false},{"fuelId":29,"product":"dsBiodiesel","supported":true},{"fuelId":30,"product":"dsDiesel","supported":true},{"fuelId":31,"product":"dsKerosene","supported":true},{"fuelId":32,"product":"gsGasohol","supported":true},{"fuelId":33,"product":"gsTBA","supported":true},{"fuelId":34,"product":"gsMethanol","supported":true},{"fuelId":35,"product":"gsMTBE","supported":true},{"fuelId":36,"product":"gsTAME","supported":true},{"fuelId":37,"product":"gsLeaded","supported":true},{"fuelId":38,"product":"gsMSpirits","supported":true},{"fuelId":39,"product":"gsPremium","supported":true},{"fuelId":40,"product":"gsRegular","supported":true},{"fuelId":41,"product":"gsETBE","supported":true},{"fuelId":42,"product":"loMotoil","supported":true},{"fuelId":43,"product":"loGear","supported":false},{"fuelId":44,"product":"loTrans","supported":false},{"fuelId":45,"product":"loToluene","supported":false},{"fuelId":46,"product":"hoBiodiesel","supported":false},{"fuelId":47,"product":"hoFueloil","supported":false},{"fuelId":48,"product":"lpLiqpetrogas","supported":false},{"fuelId":49,"product":"lpPropane","supported":false}]`;
  
  let leakDetectionObj = JSON.parse(leakDetectionData);
  console.log(leakDetectionObj);

  let probeObj = JSON.parse(probeData);
  console.log(probeObj);

  let floatObj = JSON.parse(floatData);
  console.log(floatObj);

  let menuObj = JSON.parse(menus);
  console.log(menuObj);

  // Some probes are supported by certain consoles in either a
  // wired or wireless configuration. consoleObj is used to build a list of supported
  // connection methods by console.
  let consoleObj = [  {console:'tls450-PLUS', wired:'--', wireless:"--"},
                      {console:"tls4",   wired:"--", wireless:"--"},
                      {console:"tls350", wired:"--", wireless:"--"} ];
//TBR: console.log(consoleObj);

  // Clear an HTML field
  function clearSelectList(selectList) {
      while (selectList.firstChild) {
        selectList.removeChild(selectList.firstChild);
      }
    }

  // Set a passed Dropdown list to have one entry "N/A".
  function naSelectList(selectListString) {
    var x = document.getElementById(selectListString);
    clearSelectList(x);
    emptySelectList(selectListString,'n/a');
  }



  // Set a passed Dropdown list to have one entry "--empty list--".  
  function emptySelectList(selectListString, messageText) {
    var selectList = document.getElementById(selectListString);
    var option = document.createElement("option");
//    option.text = "--empty list--";
    option.text = messageText;
    selectList.add(option);
    selectList.disabled = true;
  }

  // The dropdown selection lists appear in order on a page.
  // emptyAllSublists takes an HTML dropdown list name and sets it and
  // all following lists on the page to "--empty list--".
  // The first two dropdown lists are never cleared.
  function emptyAllSublists(startList) {
    // Find records that support the default settings and display the count.
    switch (startList) {
      case "__htmlprbTankType":
        var x = document.getElementById("__htmlprbTankType");
        clearSelectList(x);
        emptySelectList("__htmlprbTankType", "--empty list--");
      case "__htmlprbLeakDetection":
        var x = document.getElementById("__htmlprbLeakDetection");
        clearSelectList(x);
        emptySelectList("__htmlprbLeakDetection", "--empty list--");
      case "__htmlprbProbeMaterial":
        var x = document.getElementById("__htmlprbProbeMaterial");
        clearSelectList(x);
        emptySelectList("__htmlprbProbeMaterial", "--empty list--");
      case "__htmlprbCanister":
        var x = document.getElementById("__htmlprbCanister");
        clearSelectList(x);
        emptySelectList("__htmlprbCanister", "--empty list--");
      case "__htmlprbApproval":
        var x = document.getElementById("__htmlprbApproval");
        clearSelectList(x);
        emptySelectList("__htmlprbApproval", "--empty list--");
      case "__htmlprbDensity":
        var x = document.getElementById("__htmlprbDensity");
        clearSelectList(x);
        emptySelectList("__htmlprbDensity", "--empty list--");
      case "__htmlprbWaterDetection":
        var x = document.getElementById("__htmlprbWaterDetection");
        clearSelectList(x);
        emptySelectList("__htmlprbWaterDetection", "--empty list--");
      case "__htmlprbConnection":
        var x = document.getElementById("__htmlprbConnection");
        clearSelectList(x);
        emptySelectList("__htmlprbConnection", "--empty list--");
        probeMeasurementMessage("");
      case "__htmlprbMeasurement":
        var x = document.getElementById("__htmlprbMeasurement");
        clearSelectList(x);
        emptySelectList("__htmlprbMeasurement", "--empty list--");
        clearProbePartNumber();
      case "__htmlfltFloatSize":
        var x = document.getElementById("__htmlfltFloatSize");
        clearSelectList(x);
        emptySelectList("__htmlfltFloatSize", "--empty list--");
      case "__htmlfltFloatType":
        var x = document.getElementById("__htmlfltFloatType");
        clearSelectList(x);
        emptySelectList("__htmlfltFloatType", "--empty list--");
      case "__htmlfltCableLength":
        var x = document.getElementById("__htmlfltCableLength");
        clearSelectList(x);
        emptySelectList("__htmlfltCableLength", "--empty list--");
        clearFloatPartNumber();
    }
  }

    // If a dropdown has one entry, it is disabled (not selectable).
  function disableSelectList(selectListString) {
    var selectList = document.getElementById(selectListString);
    selectList.disabled = true;
  }

  // If a dropdown has more than one entry, it is enabled (selectable).
  // When enabled, the user can select one of the entries.
  function enableSelectList(selectListString) {
    var selectList = document.getElementById(selectListString);
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
        break;
      case "product":
          return;
        break;
      case "tankType":
        if (prevMenu === "product")
          return;
        break;
      case "leakDetection":
        if (prevMenu === "tankType")
          return;
        break;
      case "probeMaterial":
        if (prevMenu === "leakDetection")
          return;
        break;
      case "canister":
        if (prevMenu === "probeMaterial")
          return;
        break;
      case "approval":
        if (prevMenu === "canister")
          return;
        break;
      case "density":
        if (prevMenu === "approval")
          return;
        break;
      case "waterDetection":
        if (prevMenu === "density")
          return;
        break;
      case "connection":
        if (prevMenu === "waterDetection")
          return;
        break;

      case "measurement":
        if (prevMenu === "connection")
          return;
        break;
      case "floatSize":
        if (prevMenu === "measurement")
          return;
        break;
      case "floatType":
        if (prevMenu === "floatSize")
          return;
        break;
      case "cableLength":
        if (prevMenu === "floatType")
          return;
        break;
    }

    // *****
    // Selection out of sequence: Rebuild the selection list for probes
    switch (currMenu) {
      case "floatSize":
      case "floatType":
      case "cableLength":
        setAllFloatsInactive();
        break;
      default:
        // Go thru all probes and clear the active (selection) flag
        setAllProbesInactive();
        // Select probes to match the product group.
        findProbeByProduct(menuSelections[1]);  // 1=Product
        break;
    }

    // The following switch rebuilds the selected probes list
    // based on the user's previous selections (captured in menuSelections).
    // menuSelection contains the user's previous selections. Use the previous
    // selections to reduce the selected probes by those selections.
    switch (currMenu) {
      case "tankType":
        reduceTankType(menuSelections[2]);
        return;
      case "leakDetection":
        reduceTankType(menuSelections[2]);
        reduceLeakDetection(menuSelections[3]);
        return;
      case "probeMaterial":
        reduceTankType(menuSelections[2]);
        reduceLeakDetection(menuSelections[3]);
        reduceProbeMaterial(menuSelections[4]);
        return;
      case "canister":
        reduceTankType(menuSelections[2]);
        reduceLeakDetection(menuSelections[3]);
        reduceProbeMaterial(menuSelections[4]);
        reduceCanister(menuSelections[5]);
        return;

      case "approval":
        reduceTankType(menuSelections[2]);
        reduceLeakDetection(menuSelections[3]);
        reduceProbeMaterial(menuSelections[4]);
        reduceCanister(menuSelections[5]);
        reduceApprovals(menuSelections[6]);
        return;
      case "density":
        reduceTankType(menuSelections[2]);
        reduceLeakDetection(menuSelections[3]);
        reduceProbeMaterial(menuSelections[4]);
        reduceCanister(menuSelections[5]);
        reduceApprovals(menuSelections[6]);
        reduceDensity(menuSelections[7]);
        return;
      case "waterDetection":
        reduceTankType(menuSelections[2]);
        reduceLeakDetection(menuSelections[3]);
        reduceProbeMaterial(menuSelections[4]);
        reduceCanister(menuSelections[5]);
        reduceApprovals(menuSelections[6]);
        reduceDensity(menuSelections[7]);
        reduceWaterDetection(menuSelections[8]);
        return;
      case "connection":
        reduceTankType(menuSelections[2]);
        reduceLeakDetection(menuSelections[3]);
        reduceProbeMaterial(menuSelections[4]);
        reduceCanister(menuSelections[5]);
        reduceApprovals(menuSelections[6]);
        reduceDensity(menuSelections[7]);
        reduceWaterDetection(menuSelections[8]);
        reduceConnection(menuSelections[9]);
        return;
      case "measurement":
        reduceTankType(menuSelections[2]);
        reduceLeakDetection(menuSelections[3]);
        reduceProbeMaterial(menuSelections[4]);
        reduceCanister(menuSelections[5]);
        reduceApprovals(menuSelections[6]);
        reduceDensity(menuSelections[7]);
        reduceWaterDetection(menuSelections[8]);
        reduceConnection(menuSelections[9]);
        return;
      // *****
      // The probes dropdowns didn't change. Only float dropdowns changed.
      case "floatSize":
        findFloatByProductGroup(menuSelections[0]);
        findFloatByDensity();
        return;
      case "floatType":
      case "cableLength":
        setupFloat();
        // If a 4 inch float selected, could require Phase-two float
        checkPhaseSeparationFloat();
        displayActiveFloatsList();
        reduceFloatType(menuSelections[12]);
        return;
    }
  }


  // *************************************************************************
  // The following set of functions handle the user's dropdown list selections.
  // Most of the click functions do the following:
  //   1) Capture user's selection
  //   2) Clear the remain dropdowns
  //   3) Narrow the selected probes/floats given the users selection
  //   4) Save the selection (prevMenu) in case user clicks out of sequence
  //   5) Build the following menu/menus. The selections in the dropdowns are
  //      reduced by the contents of the active probes. If a menu only has one
  //      entry, it is skipped showing the only available selection.
  // *************************************************************************

  function clickProductGroup(v) {
    buildMenuSelectList(0, v);    // Capture user's product group selection
    buildMenu("Product", v);      // Build the next menu, which is a list of 
                                  // ProductGroup subtypes (Product)
    // Clear the remaining menu selection entries.
    emptyAllSublists("__htmlprbTankType");
    prevMenu = "productGroup";
  }

  function probeMeasurementMessage(m) {
    // If a chemical probe is being used, the probe length should be 6" longer
    // than the tank diameter.
    document.getElementById("__htmlprbChemNote").innerHTML = `<font color="red"><em><strong>`+m+`</strong></em></font>` ;
  }

  function clickProduct(v) {
    buildMenuSelectList(1, v);      // Build the next menu, which is a list of 
    emptyAllSublists("__htmlprbTankType");  // Clear remaining dropdowns
    findProbeByProduct(v);          // Narrow selected probes by product
    prevMenu = "product";
    buildMenuStructure("Tank Type", "tankType"); // Build following menu(s)
  }


  function clickTankType(v) {
    if (v === "tnktypSelect")     // Ignore the "Select" entry
      return;
    buildMenuSelectList(2, v);    // Capture selected TAnk Type
    rebuildSelectList("tankType");// Check in sequence request
    reduceTankType(v);            // Reduce probes by Tank Type
    prevMenu = "tankType";
    emptyAllSublists("__htmlprbLeakDetection"); // clear remaing dropdowns
    buildMenuStructure("Leak Detection", "leakDetection");
  }

  function clickLeakDetection(v) {
    if (v === "lekSelect")      // Ignore the "Select" entry
      return;
    buildMenuSelectList(3, v);  // Capture selected Leak Detection
    rebuildSelectList("leakDetection"); // Check in sequence request
    reduceLeakDetection(v);     // Reduce probes by Leak Detection
    prevMenu = "leakDetection";
    displayActiveProbesList();    // For Debugging
    emptyAllSublists("__htmlprbProbeMaterial"); // clear remaing dropdowns.
    buildMenuStructure("Probe Material", "probeMaterial");
  }

  function clickProbeMaterial(v) {
    if (v === "matSelect")
      return;
    buildMenuSelectList(4, v);
    rebuildSelectList("probeMaterial");
    reduceProbeMaterial(v);
    prevMenu = "probeMaterial";
    emptyAllSublists("__htmlprbCanister");
    buildMenuStructure("Canister Cover", "canister");
  }

  function clickCanister(v) {
    if (v === "canSelect")
      return;
    buildMenuSelectList(5, v);
    rebuildSelectList("canister");
    reduceCanister(v);
    prevMenu = "canister";
    emptyAllSublists("__htmlprbApproval");
    buildMenuStructure("Approval", "approval");
  }

  function clickApproval(v) {
    if (v === "aprvSelect")
      return;
    buildMenuSelectList(6, v);
    rebuildSelectList("approval");
    reduceApprovals(v);
    prevMenu = "approval";
    displayActiveProbesList();
    emptyAllSublists("__htmlprbDensity");
    buildMenuStructure("Density", "density");
  }

  function clickDensity(v) {
    if (v === "denSelect")
      return;
    buildMenuSelectList(7, v);
    rebuildSelectList("density");
    reduceDensity(v);
    prevMenu = "density";
    displayActiveProbesList();
    emptyAllSublists("__htmlprbWaterDetection");
    buildMenuStructure("Water Detection", "waterDetection");
  }

  function clickWaterDetection(v) {
    if (v === "watSelect")
      return;
    buildMenuSelectList(8, v);
    rebuildSelectList("waterDetection");
    reduceWaterDetection(v);
    prevMenu = "waterDetection";
    displayActiveProbesList();
    emptyAllSublists("__htmlprbConnection");
    buildMenuStructure("Console Connection", "connection");
  }

  function clickConnection(v) {
    if (v === "conSelect")
      return;
    buildMenuSelectList(9, v);
    rebuildSelectList("connection");
    reduceConnection(v);
    prevMenu = "connection";
    displayActiveProbesList();
    emptyAllSublists("__htmlprbMeasurement");
    buildMenuStructure("Measurement", "measurement");
  }

  function displayChemicalWarning() {
    
  }
  function clickMeasurement(v) {
    if (v === "lthSelect")
      return;
    displayFoundProbe();
    displayActiveProbesList();
    buildProbePartNumber(v);
    displayChemicalWarning();
    prevMenu = "measurement";
    menuSelections[10] = v;
    // If probe is a Mag-Flex, Float kit is included.
    if (floatIncludedWithProbe()) {
      document.getElementById("__htmlTaxonomy2PartNumber").innerHTML = "-- FLOAT INCLUDED WITH PROBE --";
      naSelectList("__htmlfltFloatSize");
      naSelectList("__htmlfltFloatType");
      naSelectList("__htmlfltCableLength");
      return (true);
    }
    // Was float already selected (e.g. length changed)?
    if (menuSelections[11] !== "empty")
      { // Float kit may be dependent on probe length
        buildFloatPartNumber();   // Yes, length changed
      }
    else
      {                           // No, float not selected yet
        setupFloat();

        emptyAllSublists("__htmlfltFloatSize");
        buildMenuStructure("Float Size", "floatSize");
        displayActiveFloatsList();
        clearFloatPartNumber();
      }
  }

  // Narrow float selection before user enters float size.
  function setupFloat() {
    setAllFloatsInactive();       // Reset float list
    switch (menuSelections[1]) {
      case "afAlcohol":
      case "afFuel6":
      case "afPropyglycol":
      case "afMethylalc":
      case "afMethanol":
      case "afETBE":
      case "afEthanol":
      case "afMTBE":
      case "afUsed":
      case "afEthylglycol":
      case "afWindhshield":
      case "afDEF":
      case "dsBiodiesel":
      case "dsDiesel":
      case "dsKerosene":
      case "avJP8":
      case "avJP10":
      case "gsGasohol":
      case "gsTBA":
      case "gsMethanol":
      case "gsMTBE":
      case "gsTAME":
      case "gsLeaded":
      case "gsMSpirits":
      case "gsPremium":
      case "gsRegular":
      case "gsETBE":
      case "avAviation":
      case "loMotoil":
      case "loGear":
      case "loTrans":
      case "loToluene":
      case "hoBiodiesel":
      case "hoFueloil":
        if ( menuSelections[8] === "watNo" )
          {
            // If user selected no water detection, always choose Alternative Float Kit (846400)
            // If the float was already defined, and the user changed the probe length
            // just update the float kit in case it depends on probe length. Otherwise,
            // Removed float initialization information.
            // If user indicated no water float, Force use of Alternative Fluid float.
            selectFloatAlternativeFluid();
          }
        else
          {
            findFloatByProduct(menuSelections[1]);
            findFloatByDensity();
          }
        break;
      case "lpLiqpetrogas":
      case "lpPropane":
      case "chAcetone":
      case "chButanol":
      case "chMEKetone":
      case "chEBenzene":
      case "chMIKetone":
      case "chXylene":
      case "chEAcetate":
      case "chBAcetate":
      case "chDichloro":
      case "chPetroNapht":
      case "chIsopropyl":
      case "chDiform":
      case "chNpropyl":
        findFloatByProduct(menuSelections[1]);
        break;
    }
    clearFloatPartNumber();
  }

  function clickFloatSize(v) {
    if (v === "fltszSelect")
      return;
    buildMenuSelectList(11, v);
    rebuildSelectList("floatSize");
    prevMenu = "floatSize";

    setupFloat();
    // If a 4 inch float selected, could require Phase-two float
    checkPhaseSeparationFloat();
    displayActiveFloatsList();

    emptyAllSublists("__htmlfltFloatType");
    buildMenuStructure("Float Type", "floatType");
    displayActiveFloatsList();
  }

  function clickFloatType(v) {
    if (v === "fltSelect")
      return;

    buildMenuSelectList(12, v);
    rebuildSelectList("floatType");
    reduceFloatType(v);
    prevMenu = "floatType";

    emptyAllSublists("__htmlfltCableLength");
    buildMenuStructure("Cable Length", "cableLength");
    enableSelectList("__htmlfltCableLength");
  }

  function clickCableLength(v) {
    if (v === "cabLthSelect")
      return;
    buildMenuSelectList(13, v);
    buildFloatPartNumber();
    return;
  }

  /*****************************************************************************
   * REDUCE FUNCTIONS:
   * Each funciton reduces the list of active/selected probes by some selection.
   ****************************************************************************/
  function reduceTankType(v) {
    for (let i = 0; i < probeObj.length; i++) {
      if (probeObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "tnktypAST":
            if (probeObj[i].tankType.ast === false) {
              probeObj[i].active = false;
            }
            break;
          case "tnktypUST":
            if (probeObj[i].tankType.ust === false) {
              probeObj[i].active = false;
            }
            break;
        }
      }
      displayActiveProbes();
    }
  }

  function reduceLeakDetection(v) {
    // Reduce selected probes by Leak Detection Selection
    for (let i = 0; i < probeObj.length; i++) {
      if (probeObj[i].active === true) {
        switch (v) {
          case "lekPt1":
            if (probeObj[i].leakDetectionSupport.pt1 !== true) {
              probeObj[i].active = false;
            }
            break;
          case "lekPt2":
            if (probeObj[i].leakDetectionSupport.pt2 !== true) {
              probeObj[i].active = false;
            }
            break;
          case "lekNon":
            if (probeObj[i].leakDetectionSupport.inventory !== true) {
              probeObj[i].active = false;
            }
            break;
        }
      }
      displayActiveProbes();
    }
  }

  function reduceProbeMaterial(v) {
    for (let i = 0; i < probeObj.length; i++) {
      if (probeObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "matAlm":
            if (probeObj[i].probeMaterial !== "Aluminum") {
              probeObj[i].active = false;
            }
            break;
          case "matStn":
            if (probeObj[i].probeMaterial !== "Stainless") {
              probeObj[i].active = false;
            }
            break;
        }
      }
    }
    displayActiveProbes();
  }

  function reduceCanister(v) {
    for (let i = 0; i < probeObj.length; i++) {
      if (probeObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "canHgp":
            if (probeObj[i].canister !== "HGP") {
              probeObj[i].active = false;
            }
            break;
          case "canAlm":
            if (probeObj[i].canister !== "Aluminum") {
              probeObj[i].active = false;
            }
            break;
          case "canStn":
            if (probeObj[i].canister !== "Stainless") {
              probeObj[i].active = false;
            }
            break;
        }
      }
      displayActiveProbes();
    }
  }

  function reduceApprovals(v) {
    for (let i = 0; i < probeObj.length; i++) {
      if (probeObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        if (v !== probeObj[i].approvals) {
          probeObj[i].active = false;
        }
      }
    }
    displayActiveProbes();
  }

  function reduceDensity(v) {
    // Reduce selected probes by Density Selection
    for (let i = 0; i < probeObj.length; i++) {
      if (probeObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "denYes":
            if (probeObj[i].density !== true) {
              probeObj[i].active = false;
            }
            break;
          case "denNo":
            if (probeObj[i].density !== false) {
              probeObj[i].active = false;
            }
            break;
        }
      }
      displayActiveProbes();
    }
  }

  function reduceWaterDetection(v) {
    // Reduce selected probes by Water Detection Selection
    for (let i = 0; i < probeObj.length; i++) {
      if (probeObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        switch (v) {
          case "watYes":
            if (probeObj[i].waterDetection !== true) {
              probeObj[i].active = false;
            }
            break;
          case "watNo":
            if (probeObj[i].waterDetection !== false) {
              probeObj[i].active = false;
            }
            break;
        }
      }
      displayActiveProbes();
    }
  }

  function reduceConnection(v) {
    for (let i = 0; i < probeObj.length; i++) {
      if (probeObj[i].active === true) {
        // Assume it isn't needed - decide to add it back below
        probeObj[i].active = false;
        for (let j=0; j < probeObj[i].support.length; j++)
          {
            if (probeObj[i].support[j].connect === "both")
              {
                probeObj[i].active = true;
                break;
              }
            if ((probeObj[i].support[j].connect === "wired") && (v==="conWired"))
              {
                probeObj[i].active = true;
                break;
              }
            if ((probeObj[i].support[j].connect === "wireless") && (v==="conWireless"))
              {
                probeObj[i].active = true;
                break;
              }
          }
      }
    }
    displayActiveProbes();
  }

  function reduceFloatType(v) {
    // Reduce selected floats by availalbe float type in active records
    for (let i = 0; i < floatObj.length; i++) {
      if (floatObj[i].active === true) {
        if (floatObj[i].flttyp.name !== v) {
          floatObj[i].active = false;
        }
      }
    }
    displayActiveFloatsList();
  }

  function clearProbePartNumber() {
    document.getElementById("__htmlTaxonomy1PartNumber").innerHTML = "";
    if (debugFlag === 'on')
      document.getElementById("__htmlprbConsole").innerHTML = "";
  }

  // Return the index for the first active/selected probe.
  function getActiveProbeIndex() {
    for (let i = 0; i < probeObj.length; i++) {
      if (probeObj[i].active === true) {
        return i; // Return active probe count
      }
    }
//TBA: Should return -1 if nothing found. Caller should check for -1.
  }

  function floatIncludedWithProbe() {
    let activeProbeIndex = getActiveProbeIndex(); // Index 1st active probe
    if (probeObj[activeProbeIndex].fltInclusive === true)
      return (true);
    else
      return (false);
  }

  function buildProbePartNumber(v) {
    let activeProbeIndex = getActiveProbeIndex(); // Index 1st active probe
    let probePartNumber = "";
    let supportedConsoles = "";
    let supportCount = 0;

     consoleObj[0].wired="--";      //TLS-450PLUS
     consoleObj[0].wireless="--";
     consoleObj[1].wired="--";      //TLS4
     consoleObj[1].wireless="--";
     consoleObj[2].wired="--";      //TLS-350
     consoleObj[2].wireless="--";
    
    for (let i = 0; i < probeObj.length; i++)
      {
        if (probeObj[i].active === true)
          {
            for (let j = 0; j < probeObj[i].support.length; j++)
            {
              if (probeObj[i].support[j].connect==="wired"){
                consoleObj[j].wired="wired";
              }
              else if (probeObj[i].support[j].connect==="wireless"){
                consoleObj[j].wireless="wireless";
              }
              else if (probeObj[i].support[j].connect==="both"){
                consoleObj[j].wired="wired";
                consoleObj[j].wireless="wireless";
              }
            }
          }
      }

    supportedConsoles = "";
    supportCount = 0;
    for (let i=0; i<consoleObj.length; i++)
      {
        if ((consoleObj[i].wired === '--') && (consoleObj[i].wireless === '--'))
          {
            continue ;
          }
        supportedConsoles=supportedConsoles + consoleObj[i].console + '(';
        if (consoleObj[i].wired === "--")
          {
            supportedConsoles=supportedConsoles + 'wireless) ';
          }
        else if (consoleObj[i].wireless === "--")
            {
              supportedConsoles=supportedConsoles + 'wired)  ';
            }
        else
          {
            supportedConsoles=supportedConsoles + 'wired and wireless)  ';
          }
      }
    if (debugFlag === 'on')
      document.getElementById("__htmlprbConsole").innerHTML = supportedConsoles;

    if (debugFlag === 'on')
      document.getElementById("__htmlprbDescription").innerHTML =
        probeObj[getActiveProbeIndex()].partItemDesc;

    for (let i = 0; i < probeObj[activeProbeIndex].prbLth.length; i++) {
      if (probeObj[activeProbeIndex].prbLth[i].msr === v) {
        probePartNumber = probeObj[activeProbeIndex].partNumBase + "-" +
          probeObj[activeProbeIndex].prbLth[i].subpart;
        document.getElementById("__htmlTaxonomy1PartNumber").innerHTML = `${probePartNumber}`;
        return;
      }
    }
  }

  function clearFloatPartNumber() {
    document.getElementById("__htmlTaxonomy2PartNumber").innerHTML = "";
  }

  /* Create the float part number string based on the type of probe, possibly
   * probe length and other selections.
   * The float data contains a base portion of the part number which is 
   * expanded upon. The partnumbers have the general format bbbbbb-xxx.
   */
  function buildFloatPartNumber() 
    {
      displayActiveProbes();        // For Debugging
      displayActiveFloatsList();    // For Debugging

      let pad = "00";
      let found = 0;
      let floatPartNumber = "";
      let j = 0;


      for (let i = 0; i < floatObj.length; i++)
        {
          // Find an active float
          if (floatObj[i].active) 
            {
              if (found > 0)
              {
                floatPartNumber = floatPartNumber + ", ";
              }
              found++;
              switch (floatObj[i].partNumBase)
                {
                  case 846400:
                    floatPartNumber = "84640" ;
                    if (menuSelections[6] === "ul")
                      floatPartNumber = floatPartNumber + "0-";
                    else
                      floatPartNumber = floatPartNumber + "1-"
                    for (j = 0; j < floatObj[i].fltsz.length; j++)
                      {
                        if (floatObj[i].fltsz[j].name === menuSelections[11])
                          break;
                      }
                    floatPartNumber = floatPartNumber + j;
                    for (j = 0; j < floatObj[i].cab.length; j++)
                      {
                        if (floatObj[i].cab[j].lth === menuSelections[13])
                          break;
                      }
                    floatPartNumber = floatPartNumber + floatObj[i].cab[j].id;
                    if ( menuSelections[8] === "watNo" ) // Water Detection No
                      {  // High Alcohol Float has no water float
                        floatPartNumber = floatPartNumber + '4';
                      }
                    else
                      {
                        switch (menuSelections[1]) {
                          case "afAlcohol":
                          case "afFuel6":
                          case "afPropyglycol":
                          case "afMethylalc":
                          case "afMethanol":
                          case "afETBE":
                          case "afEthanol":
                          case "afMTBE":
                          case "afUsed":
                          case "afEthylglycol":
                          case "afWindhshield":
                          case "afDEF":
                            floatPartNumber = floatPartNumber + '4';
                            break;
                          case "dsBiodiesel":
                          case "dsDiesel":
                          case "dsKerosene":
                          case "avJP8":
                          case "avJP10":
                            floatPartNumber = floatPartNumber + '1';
                            break;
                          case "gsGasohol":
                          case "gsTBA":
                          case "gsMethanol":
                          case "gsMTBE":
                          case "gsTAME":
                          case "gsLeaded":
                          case "gsMSpirits":
                          case "gsPremium":
                          case "gsRegular":
                          case "gsETBE":
                          case "avAviation":
                            floatPartNumber = floatPartNumber + '0';
                            break;
                          case "loMotoil":
                          case "loGear":
                          case "loTrans":
                          case "loToluene":
                            floatPartNumber = floatPartNumber + '2';
                            break;
                          case "hoBiodiesel":
                          case "hoFueloil":
                            floatPartNumber = floatPartNumber + '7';
                            break;
                          default:
                            floatPartNumber = floatPartNumber + 'x';
                            break;
                        }
                      }
                    break;
                  case 331824:
                    pad = "00";
                    floatPartNumber = floatPartNumber + floatObj[i].partNumBase + "-";
                    for (j = 0; j < floatObj[i].cab.length; j++)
                      {
                        if (floatObj[i].cab[j].lth === menuSelections[13])
                          break;
                      }
                    // Cable Length is base 1 for this float kit
                    j++;
                    floatPartNumber = floatPartNumber + j;
                    for (j = 0; j < floatObj[i].prbmsr.length; j++)
                      {
                      if (floatObj[i].prbmsr[j].msr === menuSelections[10])
                        {
                          break;
                        }
                      }
                    floatPartNumber = floatPartNumber +
                      (pad + floatObj[i].prbmsr[j].subpart).slice(-pad.length);
/*
                    // If a chemical probe is being used, the probe length should be 6" longer
                    // than the tank diameter.
                    document.getElementById("__htmlprbChemNote").innerHTML = "-- PROBE MUST BE 6 INCHES LONGER THAN TANK DIAMETER --" ;*/
                    break;
                  case 33308:
                    pad = "00";
                    floatPartNumber = floatObj[i].partNumBase;
                    for (j = 0; j < floatObj[i].fltsz.length; j++)
                      {
                        if (floatObj[i].fltsz[j].name === menuSelections[11])
                          break;
                      }
                    floatPartNumber = `${floatPartNumber}${j}-`;
                    for (j = 0; j < floatObj[i].cab.length; j++) 
                      {
                        if (floatObj[i].cab[j].lth === menuSelections[13])
                          break;
                      }
                    // Cable Length is base 1 for this float kit
                    j++;
                    floatPartNumber = floatPartNumber + j;
                    for (j = 0; j < floatObj[i].prbmsr.length; j++)
                      {
                        if (floatObj[i].prbmsr[j].msr === menuSelections[10])
                          break;
                      }
                    floatPartNumber = floatPartNumber +
                      (pad + floatObj[i].prbmsr[j].subpart).slice(-pad.length);
                    break;
                  case 886001:
                    floatPartNumber = "88600" ;
                    if (menuSelections[6] === "ul")
                      floatPartNumber = floatPartNumber + "0-";
                    else
                      floatPartNumber = floatPartNumber + "1-"
                    for (j = 0; j < floatObj[i].fltsz.length; j++)
                      {
                        if (floatObj[i].fltsz[j].name === menuSelections[11])
                          break;
                      }
                    floatPartNumber = floatPartNumber + j;
                    for (j = 0; j < floatObj[i].cab.length; j++)
                      {
                        if (floatObj[i].cab[j].lth === menuSelections[13])
                          break;
                      }
                    floatPartNumber = floatPartNumber + floatObj[i].cab[j].id;
                    switch (menuSelections[1])
                      {
                        case "gsTBA":
                        case "gsMethanol":
                        case "gsMTBE":
                        case "gsTAME":
                        case "gsLeaded":
                        case "gsPremium":
                        case "gsETBE":
                          floatPartNumber = floatPartNumber + '0';
                          break;
                        case "avJP8":
                        case "dsDiesel":
                        case "dsKerosene":
                        case "hoFueloil":
                          floatPartNumber = floatPartNumber + '1';
                          break;
                        default:
                          floatPartNumber = floatPartNumber + 'x';
                          break;
                      }
                    break;
                  case 886100:
                    floatPartNumber = "88610" ;
                    if (menuSelections[6] === "ul")
                      floatPartNumber = floatPartNumber + "0-";
                    else
                      floatPartNumber = floatPartNumber + "1-"
                    for (j = 0; j < floatObj[i].fltsz.length; j++)
                      {
                        if (floatObj[i].fltsz[j].name === menuSelections[11])
                          break;
                      }
                    floatPartNumber = `${floatPartNumber}${j}`;
                    for (j = 0; j < floatObj[i].cab.length; j++)
                      {
                        if (floatObj[i].cab[j].lth === menuSelections[13])
                          break;
                      }
                    floatPartNumber = floatPartNumber + j + "0";
                    break;
                }
            }
        }
      if (found > 0) 
        {
          document.getElementById("__htmlTaxonomy2PartNumber").innerHTML = `${floatPartNumber}`;
        }
      else
        {
          document.getElementById("__htmlTaxonomy2PartNumber").innerHTML = "-- NO FLOAT AVAILABLE --";
        }
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

  function checkLeakDetectionByProduct(product){
    for (let i=0; i<leakDetectionObj.length; i++)
      {
        if (leakDetectionObj[i].product === product)
          {
            return leakDetectionObj[i].supported;
          }
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
      activeMenuList = ["grpAviation", "grpAlternative", "grpChemical", "grpDiesel", "grpGasoline", "grpLightOil", "grpLPG", "grpHeavyOil"];
      return (activeMenuList.length);
    }
    if (menuName === "Product") {
      switch (menuGroup) {
        case "grpAviation":
          activeMenuList = ["avtypSelect", "avAviation", "avJP8", "avJP10" ];
          break;
        case "grpAlternative":
          activeMenuList = ["aftypSelect", "afAlcohol", "afDEF", "afETBE", "afEthanol", "afEthylglycol", "afFuel6", "afMTBE", "afMethanol", "afMethylalc", "afPropyglycol", "afUsed", "afWindhshield"];
          break;
        case "grpChemical":
          activeMenuList = ["chtypSelect", "chAcetone", "chButanol", "chMEKetone", "chEBenzene", "chMIKetone", "chXylene", "chEAcetate", "chBAcetate", "chDichloro", "chPetroNapht", "chIsopropyl", "chDiform", "chNpropyl"];
          break;
        case "grpDiesel":
          activeMenuList = ["dstypSelect", "dsBiodiesel", "dsDiesel", "dsKerosene"];
          break;
        case "grpGasoline":
          activeMenuList = ["gstypSelect", "gsGasohol", "gsTBA", "gsMethanol", "gsMTBE", "gsTAME", "gsLeaded", "gsMSpirits", "gsPremium", "gsRegular", "gsETBE"];
          break;
        case "grpLightOil":
          activeMenuList = ["lotypSelect", "loMotoil", "loGear", "loTrans", "loToluene"];
          break;
        case "grpLPG":
          activeMenuList = ["lptypSelect", "lpLiqpetrogas", "lpPropane"];
          break;
        case "grpHeavyOil":
          activeMenuList = ["hotypSelect", "hoBiodiesel", "hoFueloil"];
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
      case "tankType":
        addItemActiveMenuList("tnktypSelect");
        break;
      case "leakDetection":
        addItemActiveMenuList("lekSelect");
        break;
      case "probeMaterial":
        addItemActiveMenuList("matSelect");
        break;
      case "canister":
        addItemActiveMenuList("canSelect");
        break;
      case "approval":
        addItemActiveMenuList("aprvSelect");
        break;
      case "density":
        addItemActiveMenuList("denSelect");
        break;
      case "waterDetection":
        addItemActiveMenuList("watSelect");
        break;
      case "connection":
        addItemActiveMenuList("conSelect");
        break;
      case "measurement":
        addItemActiveMenuList("lthSelect");
        break;
      case "floatSize":
        addItemActiveMenuList("fltszSelect");
        break;
      case "floatType":
        addItemActiveMenuList("fltSelect");
        break;
      case "cableLength":
        addItemActiveMenuList("cabLthSelect");
        break;
    }

    // Handle specific menu item and reduce the list to active data.
    switch (menuGroup) {
      // Probe related menus - driven by probeObj
      case "tankType":
      case "canister":
      case "probeMaterial":
      case "approval":
      case "leakDetection":
      case "density":
      case "waterDetection":
      case "connection":
      case "measurement":
        for (let i = 0; i < probeObj.length; i++) {
          if (probeObj[i].active === true) {
            switch (menuGroup) {
              case "tankType":
                if (probeObj[i].tankType.ast === true) {
                  addItemActiveMenuList("tnktypAST");
                }
                if (probeObj[i].tankType.ust === true) {
                  addItemActiveMenuList("tnktypUST");
                }
                break;
              case "leakDetection":
                // If user selected AST, we don't need leak detection.
                if (probeObj[i].leakDetectionSupport.pt1 === true) {
                  if (menuSelections[2] !== "tnktypAST")
                    {
                      /* Check if the selected product supports leak detection */
                      if (checkLeakDetectionByProduct(menuSelections[1]))
                        addItemActiveMenuList("lekPt1");
                    }
                }
                if (probeObj[i].leakDetectionSupport.pt2 === true) {
                  if (menuSelections[2] !== "tnktypAST")
                    {
                      /* Check if the selected product supports leak detection */
                      if (checkLeakDetectionByProduct(menuSelections[1]))
                        addItemActiveMenuList("lekPt2");
                    }
                }
                if (probeObj[i].leakDetectionSupport.inventory === true) {
                  addItemActiveMenuList("lekNon");
                }
                break;
              case "probeMaterial":
                if (probeObj[i].probeMaterial === "Aluminum") {
                  addItemActiveMenuList("matAlm");
                } else if (probeObj[i].probeMaterial === "Stainless") {
                  addItemActiveMenuList("matStn");
                }
                break;
              case "canister":
                if (probeObj[i].canister === "HGP") {
                  addItemActiveMenuList("canHgp");
                } else if (probeObj[i].canister === "Aluminum") {
                  addItemActiveMenuList("canAlm");
                } else if (probeObj[i].canister === "Stainless") {
                  addItemActiveMenuList("canStn");
                }
                break;              
              case "approval":
                if (probeObj[i].approvals === "ul") {
                  addItemActiveMenuList("ul");
                } else if (probeObj[i].approvals === "atex") {
                  addItemActiveMenuList("atex");
                }
                break;

              case "density":
                if (probeObj[i].density === true) {
                  addItemActiveMenuList("denYes");
                } else {
                  addItemActiveMenuList("denNo");
                }
                break;

              case "waterDetection":
                if (probeObj[i].waterDetection === true) {
                  addItemActiveMenuList("watYes");
                } else {
                  addItemActiveMenuList("watNo");
                }
                break;
              case "connection":
                for (let j = 0; j < probeObj[i].support.length; j++) {
                  switch (probeObj[i].support[j].connect)
                    {
                      case "both":
                        addItemActiveMenuList("conWired")
                        addItemActiveMenuList("conWireless")
                        break;
                      case "wired":
                        addItemActiveMenuList("conWired")
                        break;
                      case "wireless":
                        addItemActiveMenuList("conWireless")
                        break;
                    }
                }
                break;
              case "measurement":
                for (let j = 0; j < probeObj[i].prbLth.length; j++) {
                  if (probeObj[i].prbLth[j].subpart !== "--")
                    addItemActiveMenuList(probeObj[i].prbLth[j].msr)
                }
                break;
            }
          }
        }
        break;
      // Float related menus - driven by floatObj
      case "floatSize":
      case "floatType":
      case "cableLength":
        for (let i = 0; i < floatObj.length; i++) {
          if (floatObj[i].active === true) {
            switch (menuGroup) {
              case "floatSize":
                for (let j = 0; j < floatObj[i].fltsz.length; j++) {

                  if (floatObj[i].fltsz[j].name !== "--")
                    addItemActiveMenuList(floatObj[i].fltsz[j].name);
                }
                break;
              case "floatType":
                addItemActiveMenuList(floatObj[i].flttyp.name);
                break;
              case "cableLength":
                for (let j = 0; j < floatObj[i].cab.length; j++) {
                  if (floatObj[i].cab[j].lth !== "--")
                    addItemActiveMenuList(floatObj[i].cab[j].lth);
                }
                break;
            }
          }
        }
        break;
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
//xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
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

  function setAllFloatsInactive() {
    for (let i = 0; i < floatObj.length; i++) {
      floatObj[i].active = false;
    }
  };

  function setAllProbesInactive() {
    for (let i = 0; i < probeObj.length; i++) {
      probeObj[i].active = false;
    }
  };

  function findProbeByProduct(product) {
    for (let i = 0; i < probeObj.length; i++) {
      probeObj[i].active = false;
      switch (product) {
        case "afAlcohol":
          if (probeObj[i].prd.afAlcohol === true) {
            probeObj[i].active = true;
          }
          break;
        case "afFuel6":
          if (probeObj[i].prd.afFuel6 === true) {
            probeObj[i].active = true;
          }
          break;
        case "afPropyglycol":
          if (probeObj[i].prd.afPropyglycol === true) {
            probeObj[i].active = true;
          }
          break;
        case "afMethylalc":
          if (probeObj[i].prd.afMethylalc === true) {
            probeObj[i].active = true;
          }
          break;
        case "afMethanol":
          if (probeObj[i].prd.afMethanol === true) {
            probeObj[i].active = true;
          }
          break;
        case "afETBE":
          if (probeObj[i].prd.afETBE === true) {
            probeObj[i].active = true;
          }
          break;
        case "afEthanol":
          if (probeObj[i].prd.afEthanol === true) {
            probeObj[i].active = true;
          }
          break;
        case "afMTBE":
          if (probeObj[i].prd.afMTBE === true) {
            probeObj[i].active = true;
          }
          break;
        case "afUsed":
          if (probeObj[i].prd.afUsed === true) {
            probeObj[i].active = true;
          }
          break;
        case "afEthylglycol":
          if (probeObj[i].prd.afEthylglycol === true) {
            probeObj[i].active = true;
          }
          break;
        case "afWindhshield":
          if (probeObj[i].prd.afWindhshield === true) {
            probeObj[i].active = true;
          }
          break;
        case "afDEF":
          if (probeObj[i].prd.afDEF === true) {
            probeObj[i].active = true;
          }
          break;
        case "avAviation":
          if (probeObj[i].prd.avAviation === true) {
            probeObj[i].active = true;
          }
          break;
        case "avJP8":
          if (probeObj[i].prd.avJP8 === true) {
            probeObj[i].active = true;
          }
          break;
        case "avJP10":
          if (probeObj[i].prd.avJP10 === true) {
            probeObj[i].active = true;
          }
          break;
        case "chAcetone":
          if (probeObj[i].prd.chAcetone === true) {
            probeObj[i].active = true;
          }
          break;
        case "chButanol":
          if (probeObj[i].prd.chButanol === true) {
            probeObj[i].active = true;
          }
          break;
        case "chMEKetone":
          if (probeObj[i].prd.chMEKetone === true) {
            probeObj[i].active = true;
          }
          break;
        case "chEBenzene":
          if (probeObj[i].prd.chEBenzene === true) {
            probeObj[i].active = true;
          }
          break;
        case "chMIKetone":
          if (probeObj[i].prd.chMIKetone === true) {
            probeObj[i].active = true;
          }
          break;
        case "chXylene":
          if (probeObj[i].prd.chXylene === true) {
            probeObj[i].active = true;
          }
          break;
        case "chEAcetate":
          if (probeObj[i].prd.chEAcetate === true) {
            probeObj[i].active = true;
          }
          break;
        case "chBAcetate":
          if (probeObj[i].prd.chBAcetate === true) {
            probeObj[i].active = true;
          }
          break;
        case "chDichloro":
          if (probeObj[i].prd.chDichloro === true) {
            probeObj[i].active = true;
          }
          break;
        case "chPetroNapht":
          if (probeObj[i].prd.chPetroNapht === true) {
            probeObj[i].active = true;
          }
          break;
        case "chIsopropyl":
          if (probeObj[i].prd.chIsopropyl === true) {
            probeObj[i].active = true;
          }
          break;
        case "chDiform":
          if (probeObj[i].prd.chDiform === true) {
            probeObj[i].active = true;
          }
          break;
        case "chNpropyl":
          if (probeObj[i].prd.chNpropyl === true) {
            probeObj[i].active = true;
          }
          break;
        case "dsBiodiesel":
          if (probeObj[i].prd.dsBiodiesel === true) {
            probeObj[i].active = true;
          }
          break;
        case "dsDiesel":
          if (probeObj[i].prd.dsDiesel === true) {
            probeObj[i].active = true;
          }
          break;
        case "dsKerosene":
          if (probeObj[i].prd.dsKerosene === true) {
            probeObj[i].active = true;
          }
          break;
        case "gsGasohol":
          if (probeObj[i].prd.gsGasohol === true) {
            probeObj[i].active = true;
          }
          break;
        case "gsTBA":
          if (probeObj[i].prd.gsTBA === true) {
            probeObj[i].active = true;
          }
          break;
        case "gsMethanol":
          if (probeObj[i].prd.gsMethanol === true) {
            probeObj[i].active = true;
          }
          break;
        case "gsMTBE":
          if (probeObj[i].prd.gsMTBE === true) {
            probeObj[i].active = true;
          }
          break;
        case "gsTAME":
          if (probeObj[i].prd.gsTAME === true) {
            probeObj[i].active = true;
          }
          break;
        case "gsLeaded":
          if (probeObj[i].prd.gsLeaded === true) {
            probeObj[i].active = true;
          }
          break;
        case "gsMSpirits":
          if (probeObj[i].prd.gsMSpirits === true) {
            probeObj[i].active = true;
          }
          break;
        case "gsPremium":
          if (probeObj[i].prd.gsPremium === true) {
            probeObj[i].active = true;
          }
          break;
        case "gsRegular":
          if (probeObj[i].prd.gsRegular === true) {
            probeObj[i].active = true;
          }
          break;
        case "gsETBE":
          if (probeObj[i].prd.gsETBE === true) {
            probeObj[i].active = true;
          }
          break;
        case "loMotoil":
          if (probeObj[i].prd.loMotoil === true) {
            probeObj[i].active = true;
          }
          break;
        case "loGear":
          if (probeObj[i].prd.loGear === true) {
            probeObj[i].active = true;
          }
          break;
        case "loTrans":
          if (probeObj[i].prd.loTrans === true) {
            probeObj[i].active = true;
          }
          break;
        case "loToluene":
          if (probeObj[i].prd.loToluene === true) {
            probeObj[i].active = true;
          }
          break;
        case "hoBiodiesel":
          if (probeObj[i].prd.hoBiodiesel === true) {
            probeObj[i].active = true;
          }
          break;
        case "hoFueloil":
          if (probeObj[i].prd.hoFueloil === true) {
            probeObj[i].active = true;
          }
          break;
        case "lpLiqpetrogas":
          if (probeObj[i].prd.lpLiqpetrogas === true) {
            probeObj[i].active = true;
          }
          break;
        case "lpPropane":
          if (probeObj[i].prd.lpPropane === true) {
            probeObj[i].active = true;
          }
          break;
      }
    }
    displayActiveProbes();
  }



  function checkPhaseSeparationFloat() {
/*
      * If the probe is Part no. 846390-1xx, 846396-1xx, 846391-1xx, 846397-1xx.
      *   If the opening is 4 inches.
      *     Check the product is in the following List:
      *       (Aviation Gasoline
      *        Leaded Gasoline
      *        Premium Unleaded Gasoline
      *        Gasoline with <= 15% MTBE
      *        Gasoline with <= 17% TAME
      *        Gasoline with <= 7% Methanol and 8% TBA
      *        Gasohol (<= 15% Ethanol)
      *        Mineral Spirits
      *        Regular Unleaded
      *        Gasoline with <= 15% ETBE
      *        Gasoline with <= 12% TBA)
 */

    if ( menuSelections[8] === "watNo" ) {
      return;
    }
    switch (menuSelections[1]) {
      case "gsGasohol":
      case "gsTBA":
      case "gsMethanol":
      case "gsMTBE":
      case "gsTAME":
      case "gsLeaded":
      case "gsMSpirits":
      case "gsPremium":
      case "gsRegular":
      case "gsETBE":
      case "avAviation":
        for (let i = 0; i < floatObj.length; i++) {
          if (floatObj[i].active === true) {
            if (menuSelections[11] === 'fltsz4') {
              if (menuSelections[7] === 'denNo') {
                  // Only Phase-two floats are valid at this point
                if (floatObj[i].flttyp.name !== "fltPha") {
                    floatObj[i].active = false;
                }
              }
            }
          }
        }
        break;
      default:
        break;
    }


  }



  function findFloatByProduct(product) {
    for (let i = 0; i < floatObj.length; i++) {
      floatObj[i].active = false;
      switch (product) {
        case "afAlcohol":
          if (floatObj[i].prd.afAlcohol === true) {
            floatObj[i].active = true;
          }
          break;
        case "afFuel6":
          if (floatObj[i].prd.afFuel6 === true) {
            floatObj[i].active = true;
          }
          break;
        case "afPropyglycol":
          if (floatObj[i].prd.afPropyglycol === true) {
            floatObj[i].active = true;
          }
          break;
        case "afMethylalc":
          if (floatObj[i].prd.afMethylalc === true) {
            floatObj[i].active = true;
          }
          break;
        case "afMethanol":
          if (floatObj[i].prd.afMethanol === true) {
            floatObj[i].active = true;
          }
          break;
        case "afETBE":
          if (floatObj[i].prd.afETBE === true) {
            floatObj[i].active = true;
          }
          break;
        case "afEthanol":
          if (floatObj[i].prd.afEthanol === true) {
            floatObj[i].active = true;
          }
          break;
        case "afMTBE":
          if (floatObj[i].prd.afMTBE === true) {
            floatObj[i].active = true;
          }
          break;
        case "afUsed":
          if (floatObj[i].prd.afUsed === true) {
            floatObj[i].active = true;
          }
          break;
        case "afEthylglycol":
          if (floatObj[i].prd.afEthylglycol === true) {
            floatObj[i].active = true;
          }
          break;
        case "afWindhshield":
          if (floatObj[i].prd.afWindhshield === true) {
            floatObj[i].active = true;
          }
          break;
        case "afDEF":
          if (floatObj[i].prd.afDEF === true) {
            floatObj[i].active = true;
          }
          break;
        case "avAviation":
          if (floatObj[i].prd.avAviation === true) {
            floatObj[i].active = true;
          }
          break;
        case "avJP8":
          if (floatObj[i].prd.avJP8 === true) {
            floatObj[i].active = true;
          }
          break;
        case "avJP10":
          if (floatObj[i].prd.avJP10 === true) {
            floatObj[i].active = true;
          }
          break;
        case "chAcetone":
          if (floatObj[i].prd.chAcetone === true) {
            floatObj[i].active = true;
          }
          break;
        case "chButanol":
          if (floatObj[i].prd.chButanol === true) {
            floatObj[i].active = true;
          }
          break;
        case "chMEKetone":
          if (floatObj[i].prd.chMEKetone === true) {
            floatObj[i].active = true;
          }
          break;
        case "chEBenzene":
          if (floatObj[i].prd.chEBenzene === true) {
            floatObj[i].active = true;
          }
          break;
        case "chMIKetone":
          if (floatObj[i].prd.chMIKetone === true) {
            floatObj[i].active = true;
          }
          break;
        case "chXylene":
          if (floatObj[i].prd.chXylene === true) {
            floatObj[i].active = true;
          }
          break;
        case "chEAcetate":
          if (floatObj[i].prd.chEAcetate === true) {
            floatObj[i].active = true;
          }
          break;
        case "chBAcetate":
          if (floatObj[i].prd.chBAcetate === true) {
            floatObj[i].active = true;
          }
          break;
        case "chDichloro":
          if (floatObj[i].prd.chDichloro === true) {
            floatObj[i].active = true;
          }
          break;
        case "chPetroNapht":
          if (floatObj[i].prd.chPetroNapht === true) {
            floatObj[i].active = true;
          }
          break;
        case "chIsopropyl":
          if (floatObj[i].prd.chIsopropyl === true) {
            floatObj[i].active = true;
          }
          break;
        case "chDiform":
          if (floatObj[i].prd.chDiform === true) {
            floatObj[i].active = true;
          }
          break;
        case "chNpropyl":
          if (floatObj[i].prd.chNpropyl === true) {
            floatObj[i].active = true;
          }
          break;
        case "dsBiodiesel":
          if (floatObj[i].prd.dsBiodiesel === true) {
            floatObj[i].active = true;
          }
          break;
        case "dsDiesel":
          if (floatObj[i].prd.dsDiesel === true) {
            floatObj[i].active = true;
          }
          break;
        case "dsKerosene":
          if (floatObj[i].prd.dsKerosene === true) {
            floatObj[i].active = true;
          }
          break;
        case "gsGasohol":
          if (floatObj[i].prd.gsGasohol === true) {
            floatObj[i].active = true;
          }
          break;
        case "gsTBA":
          if (floatObj[i].prd.gsTBA === true) {
            floatObj[i].active = true;
          }
          break;
        case "gsMethanol":
          if (floatObj[i].prd.gsMethanol === true) {
            floatObj[i].active = true;
          }
          break;
        case "gsMTBE":
          if (floatObj[i].prd.gsMTBE === true) {
            floatObj[i].active = true;
          }
          break;
        case "gsTAME":
          if (floatObj[i].prd.gsTAME === true) {
            floatObj[i].active = true;
          }
          break;
        case "gsLeaded":
          if (floatObj[i].prd.gsLeaded === true) {
            floatObj[i].active = true;
          }
          break;
        case "gsMSpirits":
          if (floatObj[i].prd.gsMSpirits === true) {
            floatObj[i].active = true;
          }
          break;
        case "gsPremium":
          if (floatObj[i].prd.gsPremium === true) {
            floatObj[i].active = true;
          }
          break;
        case "gsRegular":
          if (floatObj[i].prd.gsRegular === true) {
            floatObj[i].active = true;
          }
          break;
        case "gsETBE":
          if (floatObj[i].prd.gsETBE === true) {
            floatObj[i].active = true;
          }
          break;
        case "loMotoil":
          if (floatObj[i].prd.loMotoil === true) {
            floatObj[i].active = true;
          }
          break;
        case "loGear":
          if (floatObj[i].prd.loGear === true) {
            floatObj[i].active = true;
          }
          break;
        case "loTrans":
          if (floatObj[i].prd.loTrans === true) {
            floatObj[i].active = true;
          }
          break;
        case "loToluene":
          if (floatObj[i].prd.loToluene === true) {
            floatObj[i].active = true;
          }
          break;
        case "hoBiodiesel":
          if (floatObj[i].prd.hoBiodiesel === true) {
            floatObj[i].active = true;
          }
          break;
        case "hoFueloil":
          if (floatObj[i].prd.hoFueloil === true) {
            floatObj[i].active = true;
          }
          break;
        case "lpLiqpetrogas":
          if (floatObj[i].prd.lpLiqpetrogas === true) {
            floatObj[i].active = true;
          }
          break;
        case "lpPropane":
          if (floatObj[i].prd.lpPropane === true) {
            floatObj[i].active = true;
          }
          break;
      }
    }
    displayActiveFloatsList();
  }

  function findProbeByProductGroup(productGroup) {
    for (let i = 0; i < probeObj.length; i++) {
      probeObj[i].active = false;
      switch (productGroup) {
        case "grpAviation":
        case "grpGasoline":

          if (probeObj[i].product.gasoline === true) {
            probeObj[i].active = true;
          }
          break;
        case "grpDiesel":
          if (probeObj[i].product.diesel === true) {
            probeObj[i].active = true;
          }
          break;
        case "grpAlternative":
          if (probeObj[i].product.altFluids === true) {
            probeObj[i].active = true;
          }
          break;
        case "grpChemical":
          if (probeObj[i].product.chemical === true) {
            probeObj[i].active = true;
          }
          break;
        case "grpLightOil":
          if (probeObj[i].product.lightOil === true) {
            probeObj[i].active = true;
          }
          break;
        case "grpLPG":
          if (probeObj[i].product.lpg === true) {
            probeObj[i].active = true;
          }
          break;
        case "grpHeavyOil":
          if (probeObj[i].product.heavyOil === true) {
            probeObj[i].active = true;
          }
          break;
      }
    }
    displayActiveProbes();
  }

  function findFloatByProductGroup(productGroup) {
    let floatIdx = 0;
    for (floatIdx = 0; floatIdx < floatObj.length; floatIdx++) {
      floatObj[floatIdx].active = false;
      switch (productGroup) {
        case "grpAviation":
        case "grpGasoline":
          if (floatObj[floatIdx].product.gasoline === true) {
            floatObj[floatIdx].active = true;
          }
          break;
        case "grpDiesel":
          if (floatObj[floatIdx].product.diesel === true) {
            floatObj[floatIdx].active = true;
          }
          break;
        case "grpAlternative":
          if (floatObj[floatIdx].product.altFluids === true) {
            floatObj[floatIdx].active = true;
          }
          break;
        case "grpChemical":

          if (floatObj[floatIdx].product.chemical === true) {
            floatObj[floatIdx].active = true;
          }
          break;
        case "grpLightOil":
          if (floatObj[floatIdx].product.lightOil === true) {
            floatObj[floatIdx].active = true;
          }
          break;
        case "grpLPG":
          if (floatObj[floatIdx].product.lpg === true) {
            floatObj[floatIdx].active = true;
          }
          break;
        case "grpHeavyOil":
          if (floatObj[floatIdx].product.heavyOil === true) {
            floatObj[floatIdx].active = true;
          }
          break;
      }
    }
  }

  function findFloatByDensity() {
    for (let i = 0; i < floatObj.length; i++) {
      if (floatObj[i].active === true) {
        // Did User indicate they wanted density?
        if (menuSelections[7] === "denYes") {
          if (floatObj[i].flttyp.name !== "fltDen") {
            floatObj[i].active = false;
          }
        } else if (floatObj[i].flttyp.name === "fltDen") {
          floatObj[i].active = false;
        }
      }
    }
    displayActiveFloatsList();
  }

  function selectFloatInventoryOnly() {
    setAllFloatsInactive();
    for (let i = 0; i < floatObj.length; i++) 
      {
        if (floatObj[i].flttyp === 'fltInv')
          {
            floatObj[i].active = true;
            return ;
          }
      }
  }

  function selectFloatAlternativeFluid() {
    setAllFloatsInactive();
    for (let i = 0; i < floatObj.length; i++) 
      {
        if (floatObj[i].product.altFluids === true)
          {
            floatObj[i].active = true;
            return ;
          }
      }
  }

  function findFloatBySize(fltSize) {
    for (let i = 0; i < floatObj.length; i++) {
      if (floatObj[i].active === true) {
        // Did request match float size?
        if (floatObj[i].fltsz.name !== fltSize) {
          floatObj[i].active = false;
        }
      }
    }
    displayActiveFloatsList();
  }

  function buildHTMLFieldNames() {
    if (debugFlag === 'on')
      {
        document.getElementById("__htmlfldPartNumber").innerHTML="Probe Part Number:";
        document.getElementById("__htmlfldConsole").innerHTML="Supported Consoles:";
        document.getElementById("__htmlfldFloatPartNumber").innerHTML="Float Part Number:";

        for (let i = 0; i < menuObj.length; i++) {
          document.getElementById(menuObj[i].dlFieldName).innerHTML = menuObj[i].dlName;
        }
      } 
  }

  function displayFoundProbe() {
    if (debugFlag === 'on')
      {
        console.log("displayFoundProbe - "+probeObj[getActiveProbeIndex()]);
        document.getElementById("__htmlprbData").innerHTML = 
                                  JSON.stringify(probeObj[getActiveProbeIndex()]);
        document.getElementById("__htmlprbDescription").innerHTML =
                                  probeObj[getActiveProbeIndex()].partItemDesc;
      }
}

  function clearFoundProbe() {
    if (debugFlag === 'on')
    {
      document.getElementById("__htmlprbData").innerHTML = "";
      document.getElementById("__htmlprbDescription").innerHTML = "";
    }
  }

  function displayActiveProbesList() {
    if (debugFlag === 'on')
      {
        let probeList = "";
        let probeCount = 0;
        for (let i = 0; i < probeObj.length; i++) {
          if (probeObj[i].active === true) {
            if (probeCount === 0) {
              probeList = probeObj[i].probeId;
              probeCount++;
            } else
            {
              probeList = probeList + ', ' + probeObj[i].probeId;
            }
          }
        }
        document.getElementById("__htmlprbCountList").innerHTML = JSON.stringify(probeList);
        document.getElementById("__htmlprbCountList").innerHTML = probeList;
      }
  }

  function clearActiveProbesList() {
    if (debugFlag === 'on')
      {
        document.getElementById("__htmlprbCountList").innerHTML = "";
      }
  }


  function displayActiveFloatsList() {
    if (debugFlag === 'on')
      {
        var floatList = [];
        var floatCount = 0;
        for (let i = 0; i < floatObj.length; i++) {
          if (floatObj[i].active === true) {
            floatList[floatCount] = "Float #" + floatCount + " Float Id: " + floatObj[i].floatId;
            floatCount++;
          }
        }
        document.getElementById("__htmlfltCountList").innerHTML = JSON.stringify(floatList);
        document.getElementById("__htmlfltCount").innerHTML = floatCount + ' of ' + floatObj.length;
      }
  }

  function displayActiveProbes() {
    if (debugFlag === 'on')
      {
        let j = 0;
        i = 0;
        for (; i < probeObj.length; i++) {
          if (probeObj[i].active === true)
            j++;
        }
        document.getElementById("__htmlprbCount").innerHTML = j + ' of ' + i;
      }
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
        case "tankType":
          menuSelections[2] = activeMenuList[1];
          reduceTankType(2);
          prevMenu = "tankType";
          if (buildMenuStructure("Leak Detection", "leakDetection"))
            return (true);
        case "leakDetection":
          menuSelections[3] = activeMenuList[1];
          reduceLeakDetection(menuSelections[3]);
          prevMenu = "leakDetection";
          if (buildMenuStructure("Probe Material", "probeMaterial"))
            return (true);
        case "probeMaterial":
          menuSelections[4] = activeMenuList[1];
          reduceProbeMaterial(menuSelections[4]);
          prevMenu = "probeMaterial";
          if (buildMenuStructure("Canister Cover", "canister"))
            return (true);
        case "canister":
            menuSelections[5] = activeMenuList[1];
            reduceCanister(menuSelections[5]);
            prevMenu = "canister";
            if (buildMenuStructure("Approval", "approval"))
              return (true);
        case "approval":
          menuSelections[6] = activeMenuList[1];
          reduceApprovals(menuSelections[6]);
          prevMenu = "approval";
          if (buildMenuStructure("Density", "density"))
            return (true);
        case "density":
          menuSelections[7] = activeMenuList[1];
          reduceDensity(menuSelections[7]);
          prevMenu = "density";
          if (buildMenuStructure("Water Detection", "waterDetection"))
            return (true);
        case "waterDetection":
          menuSelections[8] = activeMenuList[1];
          reduceWaterDetection(menuSelections[8]);
          prevMenu = "waterDetection";
          if (buildMenuStructure("Console Connection", "connection"))
            return (true);
        case "connection":
          menuSelections[9] = activeMenuList[1];
          reduceWaterDetection(menuSelections[9]);
          prevMenu = "connection";
          if (menuSelections[0] === "grpChemical" || menuSelections[0] === "grpLPG") {
            probeMeasurementMessage("-- PROBE MUST BE 6 INCHES LONGER THAN TANK DIAMETER --");
          }
      
          if (buildMenuStructure("Measurement", "measurement"))
            return (true);
        case "measurement":
          menuSelections[10] = activeMenuList[1];
          prevMenu = "measurement";
          // If probe is a Mag-Flex, Float kit is included.
          if (floatIncludedWithProbe()) {
            document.getElementById("__htmlTaxonomy2PartNumber").innerHTML = "-- FLOAT INCLUDED WITH PROBE --";
            return (true);
          }
          if (buildMenuStructure("Float Size", "floatSize"))
            return (true);
        case "floatSize":
          menuSelections[11] = activeMenuList[1];
          prevMenu = "floatSize";
          displayActiveFloatsList();
          if (buildMenuStructure("Float Type", "floatType"))
            return (true);
        case "floatType":
          menuSelections[12] = activeMenuList[1];
          reduceFloatType(menuSelections[12]);
          prevMenu = "floatType";
          displayActiveFloatsList();
          if (buildMenuStructure("Cable Length", "cableLength"))
            return (true);
    case "cableLength":
          break
      }
    }
    return (true);
  }

  // ****** Main section of code - get things started
  buildHTMLFieldNames();

  // Build the initial Menu Entries - Use the default Product Group selection.
  buildMenu("Product Group", "productGroup");
  buildMenu("Product", "grpGasoline");

  // Clear the remaining menu selection entries.
  emptyAllSublists("__htmlprbTankType");

  setAllProbesInactive();
  displayActiveProbes();
