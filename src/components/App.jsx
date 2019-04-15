import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import styled from "styled-components";
import Axios from "axios";
import { Row, Col, Modal, Container, Button, FormControl, Form, NavDropdown, Nav, Navbar } from 'react-bootstrap';

const Styles = styled.div`
  .navbar {
    background-color: #CC0000;
    line-height: 1.4285;
    color: rgb(51, 51, 51);
    font-family: Targetica, "Helvetica Neue", Helvetica, Arial, sans-serif;
    font-size: 16px;
    height: 75px;
  }

  #search-result {
    line-height: 2.25;
    font-size: "16pt";
    width: "668px";
  }

  #nav-dropdown {
    color: rgb(255, 255, 255);
    font-size: 18px;
    font-weight: bold;
  }

  #search-dropdown {
    color: #CC0000;
  }

`

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      categories: [],
      categoryItems: [],
      searchItems: [],
      recentSearches: [],
      show: false,
      showSearch: false
    }
  }


  componentDidMount(){
    this.getCategories();
  }

  getCategories(){
    Axios
    .get('http://localhost:4001/api/navbar/getCategories')
    .then((data)=>{
      console.log('Axios get successful: ', data)
      this.setState({
        categories: data.data.rows,
      });
    })
    .catch((err)=>{console.log('Axios get failed: ', err)})
  }

  getItemsByCategory(category){
    Axios
    .get('http://localhost:4001/api/navbar/getItemsByCategory', {"params": {"category": category}})
    .then((data)=>{
      this.setState({
        categoryItems: data.data.rows,
      });
    })
    .catch((err)=>{console.log('Axios get failed: ', err)})
  }

  handleSearch(keyword){
    Axios
    .get('http://localhost:4001/api/navbar/search', {"params": {"keyword": keyword}})
    .then((data)=>{
      this.setState({
        searchItems: data.data.rows.length? data.data.rows : [{title: `no results found for "${keyword}"`}],
      });
    })
    .catch((err)=>{console.log('Axios get failed: ', err)})
  }

  handleHide(){
    this.refs.categories.show =false
    this.setState({
      show: false,
      categoryItems: []
    })
  }

  handleShow(){
    this.refs.categories.show = true
    this.setState({
      show: true,
      categoryItems: []
    })
  }

  handleKeyPress(event){
    if (ReactDOM.findDOMNode(this.refs.search).value){
      this.handleSearch(ReactDOM.findDOMNode(this.refs.search).value)
      event.preventDefault();
    }
    else {
      this.setState({
        searchItems: []
      })
    }
  }

  handleSelect(){
    this.setState({
      searchItems: []
    })
  }

  handleExit(){
    ReactDOM.findDOMNode(this.refs.search).value=''
    this.setState({
      searchItems: []
    })
  }

  render(){
    return (
      <Styles>
        <Navbar expand="lg">
          <Navbar.Brand href="/"><img src="https://i.ibb.co/mJmgNQQ/Targit-White.png" height="40px"/></Navbar.Brand>
          {/* <Navbar.Toggle aria-controls="basic-navbar-nav"/> */}
          {/* <Navbar.Collapse id="basic-navbar-nav"> */}
            {/* <Nav className=> */}
              <NavDropdown id="nav-dropdown" drop="left" ref="categories" title="Categories">
                {!this.state.categoryItems.length ? this.state.categories.map((category)=>{return <Container style={{borderBottom: "3px", lineHeight: 1.4285, fontSize: "16pt", width: "668px"}}><NavDropdown.Item onClick={()=>{this.handleShow(); this.getItemsByCategory(category.category)}}>{category.category}</NavDropdown.Item></Container>}) :
                this.state.categoryItems.map((categoryItem)=>{return <Container style={{borderBottom: "3px", lineHeight: 1.4285, fontSize: "16pt", width: "668px"}}><NavDropdown.Item onClick={()=>{this.handleHide(); changeItem(categoryItem.sku)}}>{categoryItem.title}</NavDropdown.Item></Container>})}
              </NavDropdown>
              <Form inline>
                <FormControl onClick={(event)=>{this.handleKeyPress(event)}} onKeyUp={(event)=>{this.handleKeyPress(event)}} ref="search" type="search" placeholder="Search" className="mr-sm-1" style={{borderRadius: "50px", height: "40px", width: "668px"}}/>
              </Form>
                {this.state.searchItems.length? <img src='https://bit.ly/2v3vRG2' height="20px" style={{opacity: "0.65"}} onClick={()=>{this.handleExit()}}/> : null}
                {/* <Nav > */}
                    <NavDropdown id="search-dropdown" ref="searchResults" show={this.state.searchItems.length ? true : false} collapseOnSelect="true" expanded="true" collapseOnSelect="true" style={{right: "700px", top: "25px"}}>
                    {this.state.searchItems.map((searchItem, index, array)=>{return <Container id="search-result" style={index === array.length-1 ? {width: "668px"} : {width: "668px", borderBottom: "1px solid rgb(214, 214, 214)", marginLeft: "15px", marginRight: "15px"}} onClick={()=>{this.handleSelect(); changeItem(searchItem.sku)}}><NavDropdown.Item class="search-result" show href="#action/3.1">{searchItem.title}</NavDropdown.Item></Container>})}
                    </NavDropdown>
                {/* </Nav> */}
            {/* </Nav> */}
          {/* </Navbar.Collapse> */}
        </Navbar>
      </Styles>        
    )
  }
}

export default App;