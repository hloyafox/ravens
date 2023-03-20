import React from 'react';
import DropDownItem from './DropDownItem';

class DropDownLocation extends React.Component {
  state = {
    locations: [{}],
    adress: 0,
  };
  locations = [
    { id: 1, name: 'Винтерфелл' },
    { id: 2, name: 'Дорн' },
    { id: 3, name: 'Речные земли' },
  ];

  componentDidMount() {
    this.locationsArray();
  }

  locationsArray = () => {
    let locat = [];
    this.locations.forEach(item => {
      if (item.id !== +this.props.id) {
        let actualLocations = {};
        actualLocations['id'] = item.id;
        actualLocations['name'] = item.name;
        locat.push(actualLocations);
        this.setState({ locations: locat });
      }
    });
  };

  handleChange = event => {
    this.setState({ adress: event.target.value });
  };

  render() {
    const location = this.state.locations;

    return (
      <div>
        <select value={this.state.adress} onChange={this.handleChange} id="select">
          <option value="0"> Выберите замок </option>
          {location.map((item, index) => (
            <DropDownItem key={index + 1} value={item.id} name={item.name} />
          ))}
        </select>
      </div>
    );
  }
}

export default DropDownLocation;
