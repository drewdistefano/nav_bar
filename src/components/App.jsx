import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import styled from "styled-components";
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Form from 'react-bootstrap/Form'
import FormControl from 'react-bootstrap/FormControl'
import Button from 'react-bootstrap/Button'
import Axios from "axios"
import Container from "react-bootstrap/Container"
import Modal from "react-bootstrap/Modal"

// targit color (red): #FF0101

class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      categories: [],
      categoryItems: [],
      searchItems: [],
      show: true
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
        searchItems: data.data.rows,
      });
    })
    .catch((err)=>{console.log('Axios get failed: ', err)})
  }

  handleKeyPress(event){
    // if(event.key == 'Enter'){
      // console.log('key', ReactDOM.findDOMNode(this.refs.search).value)
      this.handleSearch(ReactDOM.findDOMNode(this.refs.search).value)
      event.preventDefault();
    // }
  }

  render(){
    return (
      <Navbar style={{fontFamily: "Helvetica Neue"}} bg="danger" variant="light">
        <Navbar.Brand>
          <img src = 'https://bit.ly/2P1StzW' height='70' width='70'></img>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Categories" id="basic-nav-dropdown">
              {!this.state.categoryItems.length ? this.state.categories.map((category)=>{return <NavDropdown.Item onClick={()=>{this.getItemsByCategory(category.category)}} href="#action/3.1">{category.category}</NavDropdown.Item>}) :
              this.state.categoryItems.map((categoryItem)=>{return <Container style={{borderBottom: "3px", lineHeight: 1.4285, fontSize: "16pt", width: "668px"}}><NavDropdown.Item href="#action/3.1">{categoryItem.title}</NavDropdown.Item></Container>})}
            </NavDropdown>
          </Nav>
          <Form inline>
            <FormControl onKeyUp={(event)=>{this.handleKeyPress(event)}} ref="search" type="search" placeholder="Search" className="mr-sm-1" style={{borderRadius: "50px", height: "50px", width: "668px"}}/>
            <img src='https://bit.ly/2v3vRG2' height="30px" width="30px" style={{opacity: "0.65"}}></img>
          </Form>
            <Nav >
                <NavDropdown expanded="true" collapseOnSelect="true" style={{right: "700px", top: "25px"}} id="basic-nav-dropdown">
                  {this.state.searchItems.map((searchItem)=>{return <Container style={{borderBottom: "3px", lineHeight: 1.4285, fontSize: "16pt", width: "668px"}} onClick={()=>{changeItem(searchItem.sku)}}><NavDropdown.Item show href="#action/3.1">{searchItem.title}</NavDropdown.Item></Container>})}
                </NavDropdown>
            </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default App;