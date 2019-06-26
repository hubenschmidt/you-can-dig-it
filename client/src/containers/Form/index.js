import React from "react";
import Suggestions from '../../components/Suggestions'

const Form = props => (
        <form>
            <div class="search-container h-100">
                <div class="d-flex justify-content-center h-100">
                    <div class="searchbar">

                    <input
                        class="search_input"
                        placeholder="Search for..."
                        ref={input => this.search = input}
                        onChange={this.handleInputChange}
                    />
                     <a href="#" class="search_icon"><i class="fas fa-search"></i></a>
                    <p>{this.state.query}</p>
                    <Suggestions results={this.state.results} />

                    </div>
                </div>
              </div>
        </form>

)

export default Form;