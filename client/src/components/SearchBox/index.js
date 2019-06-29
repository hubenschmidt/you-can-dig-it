import React from "react";

function SearchBox(props) {
    return (
        <div>
            <form class="form-inline active-purple-3 active-purple-4">



                <input
                    class="form-control form-control-sm ml-3 w-75"
                    type="text"
                    placeholder="Search for artist, albums and more..."
                    aria-label="Search"
                    // onChange={this.handleOnChange}
                />
                <i 
                class="fas fa-search"
                aria-hidden="true"
                onClick={() => props.searchDiscogs()}
                    />
            </form>

            

        </div>
    )
}

export default SearchBox;