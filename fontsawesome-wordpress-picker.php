<?php

  /*
  * Plugin Name: Fonts Awesome WP Picker
  * Plugin URI: https://github.com/victorandeloci/fontsawesome-wordpress-picker
  * Description: WordPress plugin to use Fonts Awesome icons on posts and pages
  * Version: 1.0.0
  * Author: Victor Andeloci
  * Author URI: https://github.com/victorandeloci
  */

  function loadFwpBlock() {

    wp_enqueue_script(
      'fwp-block',
      plugin_dir_url(__FILE__) . 'js/fwp-block.js',
      array('wp-blocks','wp-editor'),
      true
    );
  }
  add_action('enqueue_block_editor_assets', 'loadFwpBlock');
