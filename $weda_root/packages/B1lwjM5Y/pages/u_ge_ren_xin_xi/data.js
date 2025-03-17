export const widgetProps = {
  "form1": {
    "style": {
      "display": "block"
    },
    "classList": [],
    "_id": "",
    "lgWidth": "md",
    "formType": "edit",
    "methodCreate": "",
    "methodUpdate": "",
    "paramGetItem": {},
    "formType_bind": false,
    "initialValues": {},
    "methodGetItem": "",
    "datasourceType": "expression",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdForm"
  },
  "container1": {
    "style": {},
    "classList": [
      "wd-form-item",
      "wd-form-title"
    ],
    "_parentId": "form1",
    "_order": 0,
    "widgetType": "gsd-h5-react:Container"
  },
  "uploadImage1": {
    "style": {},
    "classList": [],
    "name": "avatarUrl",
    "label": "用户头像",
    "value": [],
    "single": true,
    "status": "edit",
    "required": true,
    "callbacks": {},
    "showShape": "circular",
    "requiredMsg": "该项为必填项",
    "_parentId": "container1",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdUploadImage"
  },
  "input1": {
    "style": {},
    "classList": [],
    "_staticResourceAttribute": [
      "suffixSrc",
      "prefixSrc"
    ],
    "name": "nickName",
    "extra": "昵称限2-32个字符，一个汉字为2个字符",
    "label": "用户昵称",
    "status": "edit",
    "required": true,
    "template": "inputBox",
    "inputValue": "",
    "prefixIcon": "success",
    "prefixType": "",
    "suffixIcon": "success",
    "suffixType": "",
    "placeholder": "请输入用户昵称",
    "requiredMsg": "该项为必填项",
    "_parentId": "container1",
    "_order": 1,
    "widgetType": "gsd-h5-react:WdInput"
  },
  "container2": {
    "style": {
      "padding": "0px 16px"
    },
    "classList": [],
    "data": {},
    "_parentId": "container1",
    "_order": 2,
    "widgetType": "gsd-h5-react:Container"
  },
  "button1": {
    "style": {
      "width": "100%",
      "margin": "16px 0px 0px 0px"
    },
    "classList": [],
    "_staticResourceAttribute": [
      "sendMessageImg",
      "iconSrc"
    ],
    "icon": "success",
    "text": "保存",
    "block": true,
    "_parentId": "container2",
    "_order": 0,
    "widgetType": "gsd-h5-react:WdButton"
  }
}
