/* This section of the code registers a new block, sets an icon and a category, and indicates what type of fields it'll include. */

wp.blocks.registerBlockType('brad/border-box', {
  title: 'FA Icons Picker',
  icon: 'welcome-add-page',
  category: 'common',
  attributes: {
    content: {type: 'string'}
  },
  edit: function(props) {

    function updateContent(event) {
      props.setAttributes({content: event.target.value})
    }

    jQuery.getJSON(
      'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/metadata/icons.json',
      function(data) {
        var icons = JSON.parse(JSON.stringify(data));
        //icons["envelope"]
      }
    );

    return React.createElement(
      "div",
      null,
      React.createElement(
        "h4",
        { style: { color: "#666" } },
        "Fonts Awesome Icon Picker"
      ),
      React.createElement("input", { type: "text", value: props.attributes.content, onChange: updateContent }),
      React.createElement(
        "div",
        null,
        ""
      )
    );
  },
  save: function(props) {
    return wp.element.createElement(
      "div",
      null,
      props.attributes.content
    );
  }
})
