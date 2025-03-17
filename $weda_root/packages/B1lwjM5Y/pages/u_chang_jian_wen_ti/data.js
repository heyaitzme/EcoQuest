export const widgetProps = {
  "container2": {
    "style": {
      "paddingLeft": "16px",
      "paddingRight": "16px"
    },
    "classList": [],
    "data": {},
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "repeater1": {
    "style": {},
    "classList": [],
    "key": "_id",
    "suffix": "listView1",
    "forItem": "item_listView1",
    "forIndex": "index_listView1",
    "_parentId": "container2",
    "_order": 0,
    "widgetType": "gsd-h5-react:Repeater"
  },
  "repeater1_item": {
    "style": {},
    "classList": [],
    "_waForKey": "_id",
    "_parentId": "repeater1",
    "widgetType": "gsd-h5-react:RepeaterItem"
  },
  "grid2": {
    "style": {},
    "classList": [],
    "template": "[1,3]",
    "_parentId": "repeater1_item",
    "_order": 0,
    "widgetType": "gsd-h5-react:Grid"
  },
  "row2": {
    "style": {},
    "classList": [],
    "colCount": 2,
    "alignItems": "start",
    "_parentId": "grid2",
    "_order": 0,
    "widgetType": "gsd-h5-react:Row"
  },
  "col3": {
    "style": {},
    "classList": [],
    "alignSelf": "auto",
    "widthType": "fit-content",
    "_parentId": "row2",
    "_order": 0,
    "widgetType": "gsd-h5-react:Col"
  },
  "text2": {
    "style": {
      "color": "rgba(0, 0, 0, 0.40)",
      "fontSize": "14px",
      "fontWeight": "normal",
      "lineHeight": "56px"
    },
    "classList": [],
    "maxLines": "1",
    "_parentId": "col3",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdText"
  },
  "col4": {
    "style": {},
    "classList": [],
    "alignSelf": "auto",
    "widthType": "auto-fill",
    "_parentId": "row2",
    "_order": 1,
    "widgetType": "gsd-h5-react:Col"
  },
  "card2": {
    "style": {
      "border": "none",
      "boxShadow": "none",
      "background": "none"
    },
    "classList": [],
    "template": "collapse2",
    "showContent": false,
    "showDivider": false,
    "_parentId": "col4",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdCard"
  },
  "container3": {
    "style": {
      "width": "100%"
    },
    "classList": [],
    "data": {},
    "_parentId": "card2",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "text3": {
    "style": {},
    "classList": [],
    "level": "title-8",
    "maxLines": "1",
    "_parentId": "container3",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdText"
  },
  "icon2": {
    "style": {
      "marginLeft": "0.5rem"
    },
    "classList": [],
    "size": "sm",
    "_parentId": "card2",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdIcon"
  },
  "text6": {
    "style": {},
    "classList": [],
    "maxLines": "1",
    "_parentId": "card2",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdText"
  },
  "divider2": {
    "style": {
      "marginTop": "0",
      "marginBottom": "0"
    },
    "classList": [],
    "_parentId": "repeater1_item",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdDivider"
  },
  "container1": {
    "style": {
      "height": "200PX",
      "display": "flex",
      "alignItems": "center",
      "flexDirection": "column",
      "justifyContent": "center"
    },
    "classList": [],
    "data": {},
    "_order": 1,
    "widgetType": "gsd-h5-react:Container"
  },
  "icon1": {
    "style": {},
    "classList": [],
    "_staticResourceAttribute": [
      "src"
    ],
    "name": "td:error-circle",
    "size": "xl",
    "_parentId": "container1",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdIcon"
  },
  "text1": {
    "style": {},
    "classList": [],
    "text": "暂无数据",
    "maxLines": "1",
    "inheritColor": true,
    "_parentId": "container1",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdText"
  }
}
