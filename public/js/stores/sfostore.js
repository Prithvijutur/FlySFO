
var AppDispatcher = require('../dispatchers/menuDispatcher');
var EventEmitter = require('events').EventEmitter;
var SFOConstants = require('../constants/sfoconstants');
var assign = require('object-assign');

var CHANGE_EVENT = 'change';

var _todos = {};

/**
 * Delete all the completed TODO items.
 */
function destroyCompleted() {
  for (var id in _todos) {
    if (_todos[id].complete) {
      destroy(id);
    }
  }
}

  /**
   * Tests whether all the remaining TODO items are marked as completed.
   * @return {boolean}
   */
  function switchView(index) {
    return true;
  }

var sfoStore = assign({}, EventEmitter.prototype, {

  /**
   * Get the entire collection of TODOs.
   * @return {object}
   */
  getData: function() {
    return {'prithvi': 'prithvi'};
  },

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register to handle all updates
AppDispatcher.register(function(payload) {
  var action = payload.action;
  var index;

  switch(action.actionType) {
    case SFOConstants.MENU_SELECTION:
      index = action.index;
      if (index !== 1) {
        switchView(index);
      }
      break;

    case SFOConstants.BLHABLAH:
      if (sfoStore.areAllComplete()) {
        updateAll({complete: false});
      } else {
        updateAll({complete: true});
      }
      break;

    default:
      return true;
  }

  // This often goes in each case that should trigger a UI change. This store
  // needs to trigger a UI change after every view action, so we can make the
  // code less repetitive by putting it here.  We need the default case,
  // however, to make sure this only gets called after one of the cases above.
  sfoStore.emitChange();

  return true; // No errors.  Needed by promise in Dispatcher.
});

module.exports = sfoStore;
