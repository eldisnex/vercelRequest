const { Client } = require("@notionhq/client");
require("dotenv").config();

// ------------------------------------------------------ Constants ------------------------------------------------------

const notion = new Client({ auth: process.env.NOTION_KEY });

function generateBlock(blockType, text, codeLanguage = "c#") {
  returnedObject = {
    object: "block",
    type: blockType,
    [blockType]: {
      rich_text: [
        {
          type: "text",
          text: {
            content: text,
          },
        },
      ],
    },
  };
  switch (blockType) {
    case "code":
      returnedObject.code.language = codeLanguage;
      break;
    case "equation":
      returnedObject.equation.rich_text = undefined;
      returnedObject.equation.expression = text;
      break;
    case "divider":
      returnedObject.divider.rich_text = undefined;
      break;
    case "column_list":
      returnedObject.column_list.rich_text = undefined;
      returnedObject.column_list.children = [
        {
          column: {
            children: [
              {
                type: "paragraph",
                paragraph: {
                  rich_text: [
                    {
                      type: "text",
                      text: {
                        content: text,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
        {
          column: {
            children: [
              {
                type: "paragraph",
                paragraph: {
                  rich_text: [
                    {
                      type: "text",
                      text: {
                        content: text,
                      },
                    },
                  ],
                },
              },
            ],
          },
        },
      ];
      break;
    case "table":
      returnedObject.table.rich_text = undefined;
      returnedObject.table.table_width = 2;
      returnedObject.table.has_column_header = false;
      returnedObject.table.has_row_header = false;
      returnedObject.table.children = [
        {
          table_row: {
            cells: [
              [
                {
                  type: "text",
                  text: {
                    content: text,
                  },
                },
              ],
              [
                {
                  type: "text",
                  text: {
                    content: text,
                  },
                },
              ],
            ],
          },
        },
      ];
      break;
  }
  return returnedObject;
}

// ------------------------------------------------------ Code ------------------------------------------------------

/**
 * OPCIONES PARA PONER EN EL ARGUMENTO type DEL generateBlock(type, text)
 * - paragraph (<p>)
 * - heading_1 (<h1>)
 * - heading_2 (<h2>)
 * - heading_3 (<h3>)
 * - to_do
 * - bulleted_list_item (<li>)
 * - numbered_list_item (<li> with nums)
 * - code
 * - equation
 * - divider (<br>)
 * - table
 * - callout
 * - toggle
 * - quote
 * - column_list (/col2..3..4..5)
 **/

async function writeInPage(type, text) {
  estado = 200;
  try {
    const blockId = process.env.NOTION_DATABASE_ID;
    TOAPPEND = {
      children: [generateBlock(type, text)],
    };
    TOAPPEND.block_id = blockId;
    const response = await notion.blocks.children.append(TOAPPEND);
  } catch (e) {
    estado = e.status;
  }
  return estado;
}

module.exports = writeInPage;
