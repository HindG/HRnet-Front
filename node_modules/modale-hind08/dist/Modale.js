"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault").default;
Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireDefault(require("react"));
require("./modale.css");
var _exit = _interopRequireDefault(require("./exit.png"));
function Modale(props) {
  return /*#__PURE__*/_react.default.createElement("div", {
    id: "confirmation",
    className: "modal"
  }, "Employee Created!", /*#__PURE__*/_react.default.createElement("img", {
    src: _exit.default,
    alt: "",
    onClick: function onClick() {
      return props.closeModal();
    },
    className: "modal-exit"
  }));
}
var _default = Modale;
exports.default = _default;