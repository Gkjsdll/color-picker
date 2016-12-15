import React from 'react';
import ColorInfoView from './ColorInfoView.jsx';
import {Row, Col, Grid} from 'react-bootstrap';
import $ from 'jquery';
import Swatch from './Swatch.jsx';
import color from '../utils/colorHelpers.js';
import _ from 'lodash';


class CreateYourOwn extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      primary: '',
      secondary1: '',
      secondary2: '',
      tertiary1: '',
      tertiary2: ''
    };

    // this.handleChange = this.handleChange.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentWillMount() {
    //randomly pick seed color
    let randNum = function() {
      return Math.floor(Math.random() * 254);
    };
    let randColor = [randNum(), randNum(), randNum()];
    let hex = this.rgbToHex(randColor);
    //randomly pick style of palette
    let styles = ['complementary', 'splitComp', 'triad', 'analagous', 'shades'];
    let randStyle = styles[Math.floor(Math.random() * styles.length)];
    //generate random palette
    let palette;
    if (randStyle === 'complementary') {
      palette = color.complementaryPalette(hex);
    } else if (randStyle === 'splitComp') {
      palette = color.splitCPalette(hex);
    } else if (randStyle === 'triad') {
      palette = color.triadPalette(hex);
    } else if (randStyle === 'analagous') {
      palette = color.analagousPalette(hex);
    } else {
      palette = color.shadesPalette(hex);
    }
    //pass to swatches
    this.setState({
      primary: palette.primary,
      secondary1: palette.secondary1,
      secondary2: palette.secondary2,
      tertiary1: palette.tertiary1,
      tertiary2: palette.tertiary2
    });
  }

    //convert hex string e.g.'DA5252' to rgb array e.g.([218, 82, 82]) 0-255
  hexToRgb (hex) {
    var hexChars = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 'A': 10, 'B': 11, 'C': 12, 'D': 13, 'E': 14, 'F': 15};
    var result = [];
    //remove #
    hex = hex.toUpperCase().match(/.{1,2}/g);
    // split
    var r = hex[0].split(''), g = hex[1].split(''), b = hex[2].split('');
    
    result[0] = Math.round(hexChars[r[0]] * 16 + hexChars[r[1]]);
    result[1] = Math.round(hexChars[g[0]] * 16 + hexChars[g[1]]);
    result[2] = Math.round(hexChars[b[0]] * 16 + hexChars[b[1]]);
    return result;
  }

  //convert rgb array e.g.([218, 82, 82]) to hex e.g.'DA5252'
  rgbToHex (array) {
    var hexChars = {0: 0, 1: 1, 2: 2, 3: 3, 4: 4, 5: 5, 6: 6, 7: 7, 8: 8, 9: 9, 10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F'};
    var result = '';
    for (var i = 0; i < array.length; i++) {
      var d1 = parseInt(array[i] / 16);
      result += hexChars[d1];
      var d2 = array[i] - (d1 * 16);
      result += hexChars[d2];
    }
    return result;
  }

  _complementary() {
    let palette = color.complementaryPalette(this.state.primary);

    this.setState({
      // primary: palette.primary,
      secondary1: palette.secondary1,
      secondary2: palette.secondary2,
      tertiary1: palette.tertiary1,
      tertiary2: palette.tertiary2
    });
  }

  _splitComplementary() {
    let palette = color.splitCPalette(this.state.primary);
    this.setState({
      // primary: palette.primary,
      secondary1: palette.secondary1,
      secondary2: palette.secondary2,
      tertiary1: palette.tertiary1,
      tertiary2: palette.tertiary2
    });
  }

  _triad() {
    let palette = color.triadPalette(this.state.primary);

    this.setState({
      // primary: palette.primary,
      secondary1: palette.secondary1,
      secondary2: palette.secondary2,
      tertiary1: palette.tertiary1,
      tertiary2: palette.tertiary2
    }); 
  }
  _analagous() {
    let palette = color.analagousPalette(this.state.primary);

    this.setState({
      // primary: palette.primary,
      secondary1: palette.secondary1,
      secondary2: palette.secondary2,
      tertiary1: palette.tertiary1,
      tertiary2: palette.tertiary2
    }); 
  }

  _shades() {
    let palette = color.shadesPalette(this.state.primary);

    this.setState({
      // primary: palette.primary,
      secondary1: palette.secondary1,
      secondary2: palette.secondary2,
      tertiary1: palette.tertiary1,
      tertiary2: palette.tertiary2
    });
  }

  _handleSwatchClick() {

  }

  _updateSwatch(color, type) {
    var change = _.extend({}, this.state);
    change[type] = color;
    this.setState(change);
    
  }


  _handleSubmit(event) {
    event.preventDefault();
    console.log(event);

    $.ajax({
      method: 'POST',
      url: 'api/colors',
      data: this.state,
      dataType: 'JSON',
      success: function (resp) {
        console.log('success', resp);
      },
      error: function (error) {
        console.log('error', error);
      }
    });
  }

  render() {
    return (
      <div>
        <h5>Create your own!</h5>
        <br/>
        <div className='swatchWrapper'>
          <Swatch update={this._updateSwatch.bind(this)} type={'tertiary1'} color={this.state.tertiary1} />
          <Swatch update={this._updateSwatch.bind(this)} type={'secondary1'} color={this.state.secondary1} />
          <Swatch update={this._updateSwatch.bind(this)} type={'primary'} color={this.state.primary} />
          <Swatch update={this._updateSwatch.bind(this)} type={'secondary2'} color={this.state.secondary2} />
          <Swatch update={this._updateSwatch.bind(this)} type={'tertiary2'} color={this.state.tertiary2} />
        </div>

        <br/>
        <br/>
        
          <div className="input-group">
              <span className="input-group-btn">
                <button className="btn btn-default" onClick={this._complementary.bind(this)}>Complementary</button>
              </span>
              <span className="input-group-btn">
                <button className="btn btn-default" onClick={this._splitComplementary.bind(this)}>Split Complementary</button>
              </span>
              <span className="input-group-btn">
                <button className="btn btn-default" onClick={this._triad.bind(this)}>Triad</button>
              </span>
              <span className="input-group-btn">
                <button className="btn btn-default" onClick={this._analagous.bind(this)}>Analagous</button>
              </span>
              <span className="input-group-btn">
                <button className="btn btn-default" onClick={this._shades.bind(this)}>Shades</button>
              </span>
          </div>
        
        <form className="content-wrap" onSubmit={this._handleSubmit}>
          <div className="input-group">
            <span className="input-group-btn">
              <button className="btn btn-default" type="submit">Submit</button>
            </span>
          </div>
        </form>
      </div>
    );
  }
}

module.exports = CreateYourOwn;

