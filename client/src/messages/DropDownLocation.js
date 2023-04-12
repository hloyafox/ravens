import React from 'react';
import DropDownItem from './DropDownItem';

class DropDownLocation extends React.Component {
  state = {
    locations: [{}],
    adress: 0,
  };

  componentDidMount() {
    const id = +this.props.id;
    this.getLocations(id);
  }

  getLocations = id => {
    fetch(`/location/send/${this.props.raven}/${id}`)
      .then(res => res.json())
      .then(locations => {
        this.setState({ locations });
      });
  };

  handleChange = event => {
    this.setState({ adress: event.target.value });
  };

  render() {
    const location = this.state.locations;

    return (
      <div>
        <select
          className="form-select"
          value={this.state.adress}
          onChange={this.handleChange}
          id="select"
        >
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
