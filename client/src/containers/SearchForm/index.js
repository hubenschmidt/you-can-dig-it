import React from "react";

const SearchForm = props => (
        <form>
            <div className="search-container h-100">
                <div className="d-flex justify-content-center h-100">
                    <div className="searchbar">

                    <input
                        className="search_input"
                        type="text"
                        value={props.q}
                        name="q"
                        placeholder="Search for..."
                        onChange={props.handleInputChange}
                        required
                    />
                     {/* <a href="#" className="search_icon"><i className="fas fa-search"></i></a> */}
                    
                    <div className="pull-right">
                        <button
                            onClick={props.handleFormSubmit}
                            type="submit"
                            className="btn btn-lg btn-success"
                        >
                        Submit
                        </button>
                    </div>
                    </div>
                </div>
              </div>
        </form>

)

export default SearchForm;