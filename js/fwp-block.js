$(document).ready(function(){

  function insertIconContent(dataClass){

    let iconHtml = '<i class="' + dataClass + '"></i>'

    $('#selectedIcons').val($('#selectedIcons').val() + iconHtml);
    $('#iconsDisplayContainer').append(iconHtml);

  }

  $(document).on('click', '.fwp-icon', function(){
    insertIconContent($(this).attr('data-class'));
  });

});

$.getJSON(
  'https://raw.githubusercontent.com/FortAwesome/Font-Awesome/master/metadata/icons.json',
  function(data) {

    const icons = JSON.parse(JSON.stringify(data));

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

        htmlBlock += '<i title="' + item[1].label + '" class="fwp-icon fa' + suffix + ' fa-' + item[0] + '" data-class="fa' + suffix + ' fa-' + item[0] + '"></i>';

      });

      return htmlBlock;
    }

    wp.blocks.registerBlockType('fwp/icons', {
      title: 'FontsAwesome Icons Picker',
      icon: 'welcome-add-page',
      category: 'common',
      edit: function(props) {

        return React.createElement(
          'div',
          null,
          React.createElement(
            'h4',
            { style: { color: "#666" } },
            'Fonts Awesome Icon Picker'
          ),
          React.createElement(
            'div',
            {
              id: 'iconsDisplayContainer',
              className: 'selected-icons-display'
            }
          ),
          React.createElement(
            'input',
            {
              id: 'selectedIcons',
              type: 'hidden',
              placeholder: 'Selected Icons'
            }
          ),
          React.createElement(
            "div",
            {
              className: 'icons-container'
            },
            htmlToElem( renderHtmlIconBlock() )
          )
        );
      },
      save: function(props) {
        return (
          htmlToElem( $('#selectedIcons').val() )
        );
      }
    })

  }
);
