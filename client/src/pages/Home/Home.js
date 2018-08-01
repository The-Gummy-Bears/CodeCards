import React, { Component } from "react";
import Wrapper from "../../components/Wrapper";
import AddButton from "../../components/AddButton";
import API from "../../utils/API";
import CategoryCard from "../../components/CategoryCard";
import "./Home.css";

class Home extends Component {
  state = {
    categories: [],
  }

  componentDidMount() {
    if(localStorage.getItem("isLoggedin") === "true") {
      API.getUserbyName(localStorage.getItem("username")) 
        .then(res => {
            this.setState({ categories: res.data[0].categories});
        })
    }

  }

  removeCategory = (categoryName) => {
    console.log(categoryName)
    const req = {
      username: localStorage.getItem("username"),
      category: categoryName
    }
    API.deleteCategory(req)
      .then(() => 
        {API.getUserbyName(localStorage.getItem("username")) 
          .then(res => {
            this.setState({ categories: res.data[0].categories});
        })
    });
  }

  addCategory = (item) => {
      const newCategories = [...this.state.categories, item];
      this.setState({
        categories: newCategories})  
  }

  render() {
    let arr = this.state.categories;
    const list = arr.map((category) =>(
      <CategoryCard 
        className={"categoryCard"}
        key = {category}
        category = {category}
        removeCategory= {this.removeCategory}
      />
    ))
    return (
      <div>
      <div className={"cards"}>
      <Wrapper>
      {list}
      </Wrapper>
      </div>
      <AddButton username={this.props.username} addCategory={this.addCategory}/>
      </div>
    );
  }
}
  
export default Home;