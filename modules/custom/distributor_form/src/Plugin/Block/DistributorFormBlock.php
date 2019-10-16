<?php
/**
 * @file
 * Contains \Drupal\distributor_form\Plugin\Block\DistributorFormBlock;
 */

namespace Drupal\distributor_form\Plugin\Block;

use Drupal\Core\Block\BlockBase;
use Drupal\Core\Block\BlockPluginInterface;
use Drupal\Core\Form\FormStateInterface;

/**
 *
 * @Block(
 *   id = "distributor_form_block",
 *   admin_label = @Translation("Distributor Form"),
 *   category = @Translation("Distributor Form"),
 * )
 */
class DistributorFormBlock extends BlockBase implements BlockPluginInterface{

  /**
   * {@inheritdoc}
   */
  public function blockForm($form, FormStateInterface $form_state) {
    $form = parent::blockForm($form, $form_state);
    $form['page_id'] = [
      '#type' => 'textfield',
      '#title' => $this->t('Node ID'),
      '#description' => $this->t('Enter node id where you want to redirect your form.'),
      '#required' => TRUE,
      '#default_value' => $this->configuration['page_id'],
    ];
    return $form;
  }

  /**
   * {@inheritdoc}
   */
  public function blockValidate($form, FormStateInterface $form_state) {
    parent::blockValidate($form, $form_state);
    $page_id = $form_state->getValue('page_id');
    if ((!empty($page_id)) && (!preg_match("/^[1-9][0-9]*$/", $page_id))) {
      $form_state->setErrorByName('page_id', $this->t('Enter valid node ID.'));
    }
  }

  /**
   * {@inheritdoc}
   */
  public function blockSubmit($form, FormStateInterface $form_state) {
    parent::blockSubmit($form, $form_state);
    // Store values in below variables.
    $this->setConfigurationValue('page_id', $form_state->getValue('page_id'));
  }
  /**
   * {@inheritdoc}
   */
  public function build() {
    $form = \Drupal::formBuilder()->getForm('\Drupal\distributor_form\Form\DistributorForm');
    return $form;
  }
}
