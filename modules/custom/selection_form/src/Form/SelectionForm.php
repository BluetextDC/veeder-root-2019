<?php
/**
 * @file
 * Contains \Drupal\selection_form\Form\SelectionForm;
 */

namespace Drupal\selection_form\Form;

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

class SelectionForm extends FormBase {

  /**
   * {@inheritdoc}
   */
  public function getFormId() {
    return 'product_selection_form';
  }

  /**
   * {@inheritdoc}
   */
  public function buildForm(array $form, FormStateInterface $form_state) {
    $form['#attached']['library'][] = 'selection_form/selection_module_js';
    $form['#attributes']['class'][] = 'row';
    $form['probe_part_number'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Probe Part Number:'),
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

    $form['probe_description'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Probe Description:'),
      '#label_attributes' => [
        'id' => '__htmlfldDescription',
      ],
      '#attributes' => [
        'id' => '__htmlprbDescription',
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

    $form['float_part_number'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Float Part Number:'),
      '#label_attributes' => [
        'id' => '__htmlfldFloatPartNumber',
      ],
      '#attributes' => [
        'id' => '__htmlTaxonomy2PartNumber',
        'readonly' => 'readonly',
      ],
      '#prefix' => '<div class="datafilteredvalues">',
      '#suffix' => '</div>',
    ];

    $form['float_chem_note'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Float Chem Note:'),
      '#label_attributes' => [
        'id' => '__htmlfldChemNote',
      ],
      '#attributes' => [
        'id' => '__htmlprbChemNote',
        'readonly' => 'readonly',
      ],
      '#prefix' => '<div class="datafilteredvalues">',
      '#suffix' => '</div>',
    ];

    $form['select_probes'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Selected Probes:'),
      '#label_attributes' => [
        'id' => '__htmlLabelprbCount',
      ],
      '#attributes' => [
        'id' => '__htmlprbCount',
        'readonly' => 'readonly',
      ],
      '#prefix' => '<div class="datafilteredvalues">',
      '#suffix' => '</div>',
    ];

    $form['select_floats'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Selected Floats:'),
      '#label_attributes' => [
        'id' => '__htmlLabelCount',
      ],
      '#attributes' => [
        'id' => '__htmlfltCount',
        'readonly' => 'readonly',
      ],
      '#prefix' => '<div class="datafilteredvalues">',
      '#suffix' => '</div>',
    ];

    // $form['probes_data'] = [
    //   '#type' => 'textfield',
    //   '#title' => $this->t('Probes Data:'),
    //   '#label_attributes' => [
    //     'id' => '__htmlLabelData',
    //   ],
    //   '#attributes' => [
    //     'id' => '__htmlprbData',
    //     'readonly' => 'readonly',
    //   ],
    //   '#prefix' => '<div class="datafilteredvalues">',
    //   '#suffix' => '</div>',
    // ];

    $form['probes_list'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Probe List:'),
      '#label_attributes' => [
        'id' => '__htmlLabelprbCountList',
      ],
      '#attributes' => [
        'id' => '__htmlprbCountList',
        'readonly' => 'readonly',
      ],
      '#prefix' => '<div class="datafilteredvalues">',
      '#suffix' => '</div>',
    ];

    $form['float_list'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Float List:'),
      '#label_attributes' => [
        'id' => '__htmlLabelfltCountList',
      ],
      '#attributes' => [
        'id' => '__htmlfltCountList',
        'readonly' => 'readonly',
      ],
      '#prefix' => '<div class="datafilteredvalues">',
      '#suffix' => '</div>',
    ];

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
        'id' => '__htmlprbProductGroup',
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
        'id' => '__htmlprbProduct',
        'onchange' => 'clickProduct(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['left_container']['tank_type'] = [
      '#type' => 'select',
      '#title' => $this->t('Tank Type'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldTankType',
      ],
      '#attributes' => [
        'id' => '__htmlprbTankType',
        'onchange' => 'clickTankType(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['left_container']['leak_detection'] = [
      '#type' => 'select',
      '#title' => $this->t('Leak Detection'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldLeakDetection',
      ],
      '#attributes' => [
        'id' => '__htmlprbLeakDetection',
        'onchange' => 'clickLeakDetection(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['left_container']['probe_material'] = [
      '#type' => 'select',
      '#title' => $this->t('Probe Material'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldProbeMaterial',
      ],
      '#attributes' => [
        'id' => '__htmlprbProbeMaterial',
        'onchange' => 'clickProbeMaterial(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['left_container']['canister_cover'] = [
      '#type' => 'select',
      '#title' => $this->t('Canister Cover'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldCanister',
      ],
      '#attributes' => [
        'id' => '__htmlprbCanister',
        'onchange' => 'clickCanister(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['left_container']['approval'] = [
      '#type' => 'select',
      '#title' => $this->t('Approval'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldApproval',
      ],
      '#attributes' => [
        'id' => '__htmlprbApproval',
        'onchange' => 'clickApproval(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['right_container'] = array(
      '#type' => 'container',
      '#attributes' => array('class' => array('col-md-6 col-12')),
    );

    $form['right_container']['density'] = [
      '#type' => 'select',
      '#title' => $this->t('Density'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldDensity',
      ],
      '#attributes' => [
        'id' => '__htmlprbDensity',
        'onchange' => 'clickDensity(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['right_container']['water_detection'] = [
      '#type' => 'select',
      '#title' => $this->t('Water Detection'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldWaterDetection',
      ],
      '#attributes' => [
        'id' => '__htmlprbWaterDetection',
        'onchange' => 'clickWaterDetection(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['right_container']['console_connection'] = [
      '#type' => 'select',
      '#title' => $this->t('Console Connection'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldConnection',
      ],
      '#attributes' => [
        'id' => '__htmlprbConnection',
        'onchange' => 'clickConnection(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['right_container']['measurement'] = [
      '#type' => 'select',
      '#title' => $this->t('Measurement'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldMeasurement',
      ],
      '#attributes' => [
        'id' => '__htmlprbMeasurement',
        'onchange' => 'clickMeasurement(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['right_container']['float_size'] = [
      '#type' => 'select',
      '#title' => $this->t('Float Size'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldFloatSize',
      ],
      '#attributes' => [
        'id' => '__htmlfltFloatSize',
        'onchange' => 'clickFloatSize(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['right_container']['float_type'] = [
      '#type' => 'select',
      '#title' => $this->t('Float Type'),
      '#options' => [
        'none' => '--Please Select--',
      ],
      '#label_attributes' => [
        'id' => '__htmlfldFloatType',
      ],
      '#attributes' => [
        'id' => '__htmlfltFloatType',
        'onchange' => 'clickFloatType(this.value)',
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
        'id' => '__htmlfltCableLength',
        'onchange' => 'clickCableLength(this.value)',
      ],
      '#validated' => TRUE,
    ];

    $form['actions'] = [
      '#type' => 'button',
      '#value' => $this->t('Submit'),
      '#ajax' => [
        'callback' => '::setMessage',
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
  public function setMessage(array $form, FormStateInterface $form_state) {
    $response = new AjaxResponse();
    // Checking the form probe and float number are empty or not.
    if (!empty($form_state->getValue('probe_part_number')) || !empty($form_state->getValue('float_part_number'))) {
      $form_probe_part = $form_state->getValue('probe_part_number');
      $form_float_part = $form_state->getValue('float_part_number');
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
          $float_number_ids = $node->get('field_float_number_tags')->getValue();
          if (!empty($float_number_ids)) {
            foreach ($float_number_ids as $fid => $float_number_id) {
              $float_term = Term::load($float_number_ids[$fid]['target_id']);
              $float_number_name = $float_term->getName();
              if ($form_float_part == $float_number_name) {
                $float_content[$node->label()] = $node->id();
              }
            }
          }
        }
      }
      // Sorting array.
      ksort($probe_content);
      ksort($float_content);
      // Merge both array.
      $node_content = [];
      if (!empty($probe_content)) {
        $node_content[] = reset($probe_content);
      }
      if (!empty($float_content)) {
        $node_content[] = reset($float_content);
      }
     
      $current_node = \Drupal::routeMatch()->getParameter('node');
      $paragraph = $current_node->field_components->getValue();
      // Loop through the result set.
      $lighbox_title = '';
      foreach ( $paragraph as $element ) {
        $paragraph_details = \Drupal\paragraphs\Entity\Paragraph::load( $element['target_id'] );
        $paragraph_name = $paragraph_details->getType();
        if ($paragraph_name == 'selection_module') {
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
              // Checking that Probe number is coming or Float number.
              if ($keys == 0) {
                $probe_term_detail = Term::load($node_load->get('field_probe_number_tags')->getValue()[0]['target_id']);
                $numbers = $this->t('Probe Part Number: ') . $form_state->getValue('probe_part_number');
              }
              else {
                $float_term_detail = Term::load($node_load->get('field_float_number_tags')->getValue()[0]['target_id']);
                $numbers = $this->t('Float Part Number: ') . $form_state->getValue('float_part_number');
              }

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
