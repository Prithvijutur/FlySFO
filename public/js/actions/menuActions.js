
var AppDispatcher = require('../dispatchers/menuDispatcher');
var SFOConstants = require('../constants/sfoconstants');

var menuActions = {

  /**
   * @param  {number} index
   */
  select: function(index) {
    AppDispatcher.handleViewAction({
      actionType: SFOConstants.MENU_SELECTION,
      index: index
    });
  }

};

module.exports = menuActions;
