import React, { PureComponent } from 'react';

import './App.css';

import CheckList from './CheckList';

class App extends PureComponent {
  constructor() {
    super();

    this.state = {
      checkedItems: [],
      uncheckedItems: [],
    };
  }

  handleNewTodoItem(item) {
    this.setState({

      uncheckedItems: [
        ...this.state.uncheckedItems,
        item,
      ],

    });
  }

  handleNewDoneItem(item) {
    item.isChecked = true;

    this.setState({

      checkedItems: [
        ...this.state.checkedItems,
        item,
      ],

    });
  }

  handleItemCheck(itemId) {
    const itemToMove = this.state.uncheckedItems.find(item => item.id === itemId);
    itemToMove.isChecked = true;

    const newUncheckedItems = this.state.uncheckedItems.filter(item => item.id !== itemId);

    this.setState({

      uncheckedItems: newUncheckedItems,

      checkedItems: [
        ...this.state.checkedItems,
        itemToMove,
      ],

    });
  }

  handleItemUncheck(itemId) {
    const itemToMove = this.state.checkedItems.find(item => item.id === itemId);
    itemToMove.isChecked = false;

    const newCheckedItems = this.state.checkedItems.filter(item => item.id !== itemId);

    this.setState({

      checkedItems: newCheckedItems,

      uncheckedItems: [
        ...this.state.uncheckedItems,
        itemToMove,
      ],

    });
  }

  render() {
    return (
      <div className="app-wrapper">
        <main className="app-main">

          <section className="app-todo-list">
            <h2>
              TODO
            </h2>

            <CheckList
              id="todo-list"
              items={this.state.uncheckedItems}
              placeholderText="Write something you have to do"

              onNewItem={item => this.handleNewTodoItem(item)}
              onCheck={itemId => this.handleItemCheck(itemId)}
              onUncheck={itemId => this.handleItemUncheck(itemId)}
            />
          </section>

          <section className="app-done-list">
            <h2>
              DONE
            </h2>

            <CheckList
              id="done-list"
              items={this.state.checkedItems}
              placeholderText="Write something you already done"

              onNewItem={item => this.handleNewDoneItem(item)}
              onCheck={itemId => this.handleItemCheck(itemId)}
              onUncheck={itemId => this.handleItemUncheck(itemId)}
            />
          </section>

        </main>
      </div>
    );
  }
}

export default App;
