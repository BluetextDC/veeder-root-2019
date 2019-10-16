<?php
/**
 * @file
 * Contains \Drupal\sensor_form\Form\SensorForm;
 */

namespace Drupal\sensor_form\Form;

use Drupal\Core\Form\FormBase;
use Drupal\Core\Form\FormStateInterface;
use Drupal\Core\Ajax\AjaxResponse;
use Drupal\Core\Ajax\HtmlCommand;
use Drupal\Core\Ajax\ChangedCommand;
use Drupal\Core\Ajax\CssCommand;
use Drupal\Core\Ajax\InvokeCommand;
use Drupal\taxonomy\Entity\Term;
use Drupal\node\Entity\Node;
use Drupal\Core\Url;
use Drupal\Component\Utility\Unicode;

class SensorForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'product_sensor_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['#attached']['library'][] = 'sensor_form/sensor_module_js';
    $form['#attributes']['class'][] = 'row';

    $form['sensor_part_number'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Sensor Part Number:'),
      '#label_attributes' => [
        'id' => '__htmlfldPartNumber',
      ],
      '#attributes' => [
        'id' => '__htmlTaxonomy1PartNumber',
        'readonly' => 'readonly',
      ],
      '#prefix' => '<div class="datafilteredvalues">',
      '#suffix' => '</div>',
    ];

    $form['sensor_accessory'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Accessories:'),
      '#label_attributes' => [
        'id' => '__htmlsnsrAccessory1',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrAccessoryDesc1',
        'readonly' => 'readonly',
      ],
      '#prefix' => '<div class="datafilteredvalues">',
      '#suffix' => '</div>',
    ];

    // $form['sensor_accessory_desc'] = [
    //   '#type' => 'textfield',
    //   '#title' => $this->t('Accessories Description:'),
    //   '#label_attributes' => [
    //     'id' => '__htmlfldAccessoryDesc1',
    //   ],
    //   '#attributes' => [
    //     'id' => '__htmlsnsrAccessoryDesc1',
    //     'readonly' => 'readonly',
    //   ],
    //   '#prefix' => '<div class="datafilteredvalues">',
    //   '#suffix' => '</div>',
    // ];

    $form['sensor_description'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Sensor Description:'),
      '#label_attributes' => [
        'id' => '__htmlfldDescription',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrDescription',
        'readonly' => 'readonly',
      ],
      '#prefix' => '<div class="datafilteredvalues">',
      '#suffix' => '</div>',
    ];

    $form['sensor_accessory2'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Accessories 2:'),
      '#label_attributes' => [
        'id' => '__htmlfldsnsrAccessory2',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrAccessory2',
        'readonly' => 'readonly',
      ],
      '#prefix' => '<div class="datafilteredvalues">',
      '#suffix' => '</div>',
    ];

    $form['sensor_accessory_desc2'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Accessories Description 2:'),
      '#label_attributes' => [
        'id' => '__htmlfldsnsrAccessoryDesc2',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrAccessoryDesc2',
        'readonly' => 'readonly',
      ],
      '#prefix' => '<div class="datafilteredvalues">',
      '#suffix' => '</div>',
    ];

    $form['supported_consoles'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Supported Consoles:'),
      '#label_attributes' => [
        'id' => '__htmlfldConsole',
      ],
      '#attributes' => [
        'id' => '__htmlprbConsole',
        'readonly' => 'readonly',
      ],
      '#prefix' => '<div class="datafilteredvalues">',
      '#suffix' => '</div>',
    ];
    // Gauge repeater fields.
    for ($i = 1; $i <= 6; $i++) {
      $form['gauge_'.$i] = [
        '#type' => 'textfield',
        '#title' => $this->t('Gauge '.$i),
        '#label_attributes' => [
          'id' => '__htmlfldsnsrGauge'.$i,
        ],
        '#attributes' => [
          'id' => '__htmlsnsrGauge'.$i,
          'readonly' => 'readonly',
        ],
        '#prefix' => '<div class="datafilteredvalues gauge-' . $i . '">',
        '#suffix' => '</div>',
      ];
      
      // Software repeater fields.
      $form['software_'.$i] = [
        '#type' => 'textfield',
        '#title' => $this->t('Software '.$i),
        '#label_attributes' => [
          'id' => '__htmlfldsnsrSoftware'.$i,
        ],
        '#attributes' => [
          'id' => '__htmlsnsrSoftware'.$i,
          'readonly' => 'readonly',
        ],
        '#prefix' => '<div class="datafilteredvalues software-' . $i . '">',
        '#suffix' => '</div>',
      ];
      
      // Interface repeater fields.
      $form['interface_'.$i] = [
        '#type' => 'textfield',
        '#title' => $this->t('Interface '.$i),
        '#label_attributes' => [
          'id' => '__htmlfldsnsrInterface'.$i,
        ],
        '#attributes' => [
          'id' => '__htmlsnsrInterface'.$i,
          'readonly' => 'readonly',
        ],
        '#prefix' => '<div class="datafilteredvalues interface-' . $i . '">',
        '#suffix' => '</div>',
      ];
      
      // Connect repeater fields.
      $form['connect_'.$i] = [
        '#type' => 'textfield',
        '#title' => $this->t('Connect '.$i),
        '#label_attributes' => [
          'id' => '__htmlfldsnsrConnect'.$i,
        ],
        '#attributes' => [
          'id' => '__htmlsnsrConnect'.$i,
          'readonly' => 'readonly',
        ],
        '#prefix' => '<div class="datafilteredvalues connect-' . $i . '">',
        '#suffix' => '</div>',
      ];
    }

    $form['selected_sensors'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Selected Sensors'),
      '#label_attributes' => [
        'id' => '__htmlLabelprbCountList',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrCount',
        'readonly' => 'readonly',
      ],
      '#prefix' => '<div class="datafilteredvalues">',
      '#suffix' => '</div>',
    ];

    $form['sensor_list'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Sensor List'),
      '#label_attributes' => [
        'id' => '__htmlLabelfltCountList',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrCountList',
        'readonly' => 'readonly',
      ],
      '#prefix' => '<div class="datafilteredvalues">',
      '#suffix' => '</div>',
    ];

    // Form fields.
    $form['left_container'] = array(
      '#type' => 'container',
      '#attributes' => array('class' => array('col-md-6 col-12')),
    );

    $form['left_container']['product_group'] = [
      '#type' => 'select',
      '#title' => $this->t('Product Group'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldProductGroup',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrProductGroup',
        'onchange' => 'clickProductGroup(this.value)',
      ],
      '#validated' => TRUE,

    ];

    $form['left_container']['product'] = [
      '#type' => 'select',
      '#title' => $this->t('Product'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldProduct',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrProduct',
        'onchange' => 'clickProduct(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['left_container']['usage'] = [
      '#type' => 'select',
      '#title' => $this->t('Usage'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldUsage',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrUsage',
        'onchange' => 'clickUsage(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['left_container']['vacuum'] = [
      '#type' => 'select',
      '#title' => $this->t('Vacuum'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldVacuum',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrVacuum',
        'onchange' => 'clickVacuum(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['left_container']['discriminating'] = [
      '#type' => 'select',
      '#title' => $this->t('Discriminating'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldDiscriminating',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrDiscriminating',
        'onchange' => 'clickDiscriminating(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['left_container']['position_sensitive'] = [
      '#type' => 'select',
      '#title' => $this->t('Position Sensitive'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldPositionSensitive',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrPositionSensitive',
        'onchange' => 'clickPositionSensitive(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['left_container']['level_sensing'] = [
      '#type' => 'select',
      '#title' => $this->t('Level Sensing'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldLevelSensing',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrLevelSensing',
        'onchange' => 'clickLevelSensing(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['left_container']['static_testing'] = [
      '#type' => 'select',
      '#title' => $this->t('Static Testing'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldStaticTesting',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrStaticTesting',
        'onchange' => 'clickStaticTesting(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['left_container']['hydro_static'] = [
      '#type' => 'select',
      '#title' => $this->t('Hydro Static'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldHydrostatic',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrHydrostatic',
        'onchange' => 'clickHydroStatic(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['right_container'] = array(
      '#type' => 'container',
      '#attributes' => array('class' => array('col-md-6 col-12')),
    );

    $form['right_container']['solid_state'] = [
      '#type' => 'select',
      '#title' => $this->t('Solid State'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldSolidState',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrSolidState',
        'onchange' => 'clickSolidState(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['right_container']['leak_detection'] = [
      '#type' => 'select',
      '#title' => $this->t('Leak Detection'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldLeakDetection',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrLeakDetection',
        'onchange' => 'clickLeakDetection(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['right_container']['tank_type'] = [
      '#type' => 'select',
      '#title' => $this->t('Tank Type'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldTankType',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrTankType',
        'onchange' => 'clickTankType(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['right_container']['points'] = [
      '#type' => 'select',
      '#title' => $this->t('Points'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldPoints',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrPoints',
        'onchange' => 'clickPoints(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['right_container']['sensor_length'] = [
      '#type' => 'select',
      '#title' => $this->t('Sensor Length'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldSensorLength',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrSensorLength',
        'onchange' => 'clickSensorLength(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['right_container']['cable_length'] = [
      '#type' => 'select',
      '#title' => $this->t('Cable Length'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldCableLength',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrCableLength',
        'onchange' => 'clickCableLength(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['right_container']['tanks'] = [
      '#type' => 'select',
      '#title' => $this->t('Tanks'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldTanks',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrTanks',
        'onchange' => 'clickTanks(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['right_container']['pipes'] = [
      '#type' => 'select',
      '#title' => $this->t('Pipes'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldPipes',
      ],
      '#attributes' => [
        'id' => '__htmlsnsrPipes',
        'onchange' => 'clickPipes(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['actions'] = [
      '#type' => 'button',
      '#value' => $this->t('Submit'),
      '#ajax' => [
        'callback' => '::sensorSetMessage',
      ],
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function validateForm(array &$form, FormStateInterface $form_state) {
    return parent::validateForm($form, $form_state);
  }

  /**
   * {@inheritdoc}
   */
  public function submitForm(array &$form, FormStateInterface $form_state) {
    return parent::submitForm($form, $form_state);; 
  }

  /**
   *
   */
  public function sensorSetMessage(array $form, FormStateInterface $form_state) {
    $response = new AjaxResponse();
    // Checking the form probe and float number are empty or not.
    if (!empty(Unicode::strlen($form_state->getValue('sensor_part_number')))) {
      $form_probe_part = $form_state->getValue('sensor_part_number');
      // Load all 3 content type (Those are having selection module).
      $content_types = ['product_detail', 'product_listing', 'product_showcase'];
      // Here getting node ids.
      $nids = [];
      foreach ($content_types as $bundle) {
        $nids[] = \Drupal::entityQuery('node')->condition('type', $bundle)->execute();
      }
      // Load node object using node id.
      $node_objects = [];
      foreach ($nids as $nid) {
        $node_objects[] =  \Drupal\node\Entity\Node::loadMultiple($nid);
      }
      // Find matching terms.
      $probe_content = [];
      $float_content = [];
      foreach($node_objects as $node_object) {
        $node_collection = [];
        foreach ($node_object as $node) {
          $probe_number_ids = $node->get('field_probe_number_tags')->getValue();
          if (!empty($probe_number_ids)) {
            foreach ($probe_number_ids as $pid => $probe_number_id) {
              $probe_term = Term::load($probe_number_ids[$pid]['target_id']);
              $probe_number_name = $probe_term->getName();
              if ($form_probe_part == $probe_number_name) {
                $probe_content[$node->label()] = $node->id();
              }
            }
          }
        }
      }
      // Sorting array.
      ksort($probe_content);
      // Merge both array.
      $node_content = [];
      if (!empty($probe_content)) {
        $node_content[] = reset($probe_content);
      }
     
      $current_node = \Drupal::routeMatch()->getParameter('node');
      $paragraph = $current_node->field_components->getValue();
      // Loop through the result set.
      $lighbox_title = '';
      foreach ( $paragraph as $element ) {
        $paragraph_details = \Drupal\paragraphs\Entity\Paragraph::load( $element['target_id'] );
        $paragraph_name = $paragraph_details->getType();
        if ($paragraph_name == 'sensor_module') {
          $lighbox_title = $paragraph_details->field_selection_lightbox_title->value;
        }
      }

      if (!empty($node_content)) {
        $match_output = '<div class="product-list fancy-popup-form-submit">';
          $match_output .= '<h3 class="text-center">' . $lighbox_title . '</h3>';
          $match_output .= '<div class="row fancy-product-group">';
            foreach ($node_content as $keys => $node_id) {
              $node_load = Node::load($node_id);
              // Node Title.
              $node_title = $node_load->label();
              if (!empty($node_load->field_taxonomy_image->entity->uri->value)) {
                $taxonomy_image = file_create_url($node_load->field_taxonomy_image->entity->uri->value);
              }
              else {
                $taxonomy_image = '/sites/default/files/default_images/default-image-product_0.png';
              }
              // Sensor Part Number.
              $numbers = $this->t('Sensor Part Number: ') . $form_state->getValue('sensor_part_number');

              $node_url = Url::fromRoute('entity.node.canonical', ['node' => $node_id], ['absolute' => TRUE])->toString();
              $link_text = $this->t('Learn More');
              // Class condition.
              if (count($node_content) == 1) {
                $repeating_class = 'col-md-12 col-sm-12';
              }
              else {
                $repeating_class = 'col-md-6 col-sm-12';
              } 

              $match_output .= '<div class="item ' . $repeating_class . ' ajax-response">
                                  <div class="h4 text-center">' . $numbers . '</div>
                                  <figure style="height: 150px;">
                                    <a href="' . $node_url . '" class="clickable-image" target="_blank">
                                      <img src="' . $taxonomy_image . '" alt="' . $node_title . '">
                                    </a>
                                  </figure>
                                  <div class="p-data">
                                    <span class="hr-line"></span>
                                    <h4 class="h6">' . $node_title . '</h4>
                                    <a href="' . $node_url . '" class="btn-link" hreflang="en" target="_blank">' . $link_text . '</a>
                                  </div>
                                </div>';
            }
          $match_output .= '</div>';
        $match_output .= '</div>';
      }
      else {
        $match_output = '<div class="product-list fancy-popup-form-submit">';
          $match_output .= '<div class="ajax-response">';
            $match_output .= '<h3>' . $this->t('Match not found'). '</h3>';
          $match_output .= '</div>';
        $match_output .= '</div>';
      }
      $response->addCommand( new HtmlCommand('.filter-form-data-container', $match_output));
    }
    else {
      $warning_text = '<div class="product-list fancy-popup-form-submit">';
        $warning_text .= '<div class="ajax-response">';
          $warning_text .= '<h3>' . $this->t('Please select all the product variations'). '</h3>';
        $warning_text .= '</div>';
      $warning_text .= '</div>';
      $response->addCommand( new HtmlCommand('.filter-form-data-container', $warning_text));
    }

    return $response;
  }
}
