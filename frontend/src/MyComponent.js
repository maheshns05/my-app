import React, { Component } from "react";

class MyTabsComponent extends Component {
    constructor() {
        super();

        this.state = {
            tabs: [
                { title: 'Section title 1', view: 'Contet of section 1'},
                { title: 'Section title 2', view: 'Contet of section 2'},
                { title: 'Section title 3', view: 'Contet of section 3'}
            ],
            selectedIndex: 0
        };

        this.selectedTabHandler = this.selectedTabHandler.bind(this);
    }

    selectedTabHandler(selectedTab) {
        this.setState({
            selectedIndex: selectedTab
        })
    }

    render() {
        let tabsList = this.state.tabs.map((tab, index) => {
            return (
                <button className={this.state.selectedIndex === index ? 'btn-active': 'btn'} key={index} onClick={() => this.selectedTabHandler(index)}>
                    {tab.title}
                </button>
            )
        });

        let selectedTab = this.state.tabs[this.state.selectedIndex];

        return (
            <div className="tabs">
                {tabsList}
                <div className="view" title={selectedTab.title}>
                    {selectedTab.view}
                </div>
            </div>
        )
    }
}

export default MyTabsComponent;
