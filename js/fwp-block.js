jQuery.getJSON(
  'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/metadata/icons.json',
  function(data) {

    const icons = JSON.parse(JSON.stringify(data));
    //icons["fa-code"].property

    const htmlToElem = ( html ) => wp.element.RawHTML( { children: html } );

    function renderHtmlIconBlock(){

      let htmlBlock = '';

      const entries = Object.entries(icons);
      entries.forEach((item, i) => {

        let suffix;

        switch (item[1].free[0]) {
          case 'brands':
            suffix = 'b';
            break;
          case 'solid':
            suffix = 's';
            break;
          default:
            suffix = 'b';
        }

        htmlBlock += '<i title="' + item[1].label + '" class="fa' + suffix + ' fa-' + item[0] + '"></i>';

      });

      return htmlBlock;
    }

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

        return React.createElement(
          'div',
          null,
          React.createElement(
            'h4',
            { style: { color: "#666" } },
            'Fonts Awesome Icon Picker'
          ),
          React.createElement(
            'input',
            {
              id: 'selectedIcons',
              type: 'text',
              placeholder: 'Selected Icons',
              value: props.attributes.content,
              onChange: updateContent
            }
          ),
          React.createElement(
            "div",
            { className: 'icons-container' },
            htmlToElem( renderHtmlIconBlock() ),
          )
        );
      },
      save: function(props) {
        return wp.element.createElement(
          'div',
          null,
          props.attributes.content
        );
      }
    })

  }
);
