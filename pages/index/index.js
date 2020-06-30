const rpn = require("../../utils/rpn.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
    id9: "9",
    id8: "8",
    id7: "7",
    id6: "6",
    id5: "5",
    id4: "4",
    id3: "3",
    id2: "2",
    id1: "1",
    id0: "0",
    id00: "00",

    idc: "ac",
    idt: "±",
    idper: "%",
    iddot: ".",
    idadd: "+",
    idsub: "-",
    idmul: "×",
    iddiv: "÷",
    ideq: "=",

    equation: "0",
    isDecimalAdded: false,
    isOperatorAdded: false,
    isStarted: false,
    isEntering: false
  },

  /**
   * 自定义函数
   */
  isOperator: function (character) {
    return ["+", "-", "×", "÷"].indexOf(character) > -1;
  },
  append: function (e) {
    var character = e.currentTarget.id
    // Start
    if (this.data.equation === "0" && !this.isOperator(e.currentTarget.id)) {
      if (character === ".") {
        this.setData({
          equation: this.data.equation += "" + character,
          isDecimalAdded: true
        })
      } else {
        this.setData({
          equation: "" + character,
          isEntering: true
        })
      }

      this.setData({
        isStarted: true
      })

      return;
    }

    // If Number
    if (!this.isOperator(character)) {
      if (character === "." && this.data.isDecimalAdded) {
        return;
      }

      if (character === ".") {
        this.setData({
          isDecimalAdded: true,
          isOperatorAdded: true
        })
      } else {
        this.setData({
          isOperatorAdded: false
        })
      }

      if (!this.data.isEntering) {
        this.setData({
          isEntering: true,
          equation: "" + character
        })
        return;
      }

      this.setData({
        equation: this.data.equation += "" + character,
      })

    }

    // Added Operator
    if (this.isOperator(character) && !this.data.isOperatorAdded) {
      this.setData({
        equation: this.data.equation += "" + character,
        isDecimalAdded: false,
        isOperatorAdded: true,
        isEntering: true
      })
    }

  },

  calculate: function () {
    var result = this.data.equation
      .replace(new RegExp("×", "g"), "*")
      .replace(new RegExp("÷", "g"), "/");

    var ans = rpn.calCommonExp(result)

    this.setData({
      equation: (ans < 1.0e9 ? parseFloat(ans.toFixed(9)) : ans.toExponential(3)).toString(),
      isDecimalAdded: false,
      isOperatorAdded: false,
      isEntering: false
    })


  },

  // When pressed '+/-'
  calculateToggle() {
    if (this.data.isOperatorAdded || !this.data.isStarted) {
      return;
    }
    this.setData({
      equation: this.data.equation + "* -1"
    })
    this.calculate();
  },

  // When pressed '%'
  calculatePercentage() {
    if (this.data.isOperatorAdded || !this.data.isStarted) {
      return;
    }
    this.setData({
      equation: this.data.equation + "* 0.01"
    })
    this.calculate();
  },

  // When pressed 'AC'
  clear() {
    this.setData({
      equation: "0",
      isDecimalAdded: false,
      isOperatorAdded: false,
      isStarted: false,
      isEntering: false
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})