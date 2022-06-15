let booklist = document.getElementById("data");

// this variable will store the innerHtml of element with "list" id
let listData = null;

// set a url for getting data
const url = "https://www.anapioficeandfire.com/api/books?page=1&pageSize=15";

// fetching the data
fetch("https://www.anapioficeandfire.com/api/books?page=1&pageSize=15")
  .then((response) => response.json())
  .then((data) => console.log(data));
console.log(data);

async function displayData() {
  try {
    let result = await fetch(url);
    let obj = await result.json();

    let str = "";

    // assign data class to each and every data cells
    obj.forEach((book, index) => {
      str += `
        <tr class="table">
        <th scope="row">${index + 1}</th>
        <td class="data">${book.name}</td>
        <td class="data">${book.isbn}</td>
        <td class="data">${book.numberOfPages}</td>
        <td class="data">${book.authors}</td>
        <td class="data">${book.publisher}</td>
        <td class="data">${book.released}</td>
        </tr>
        `;
    });
    document.getElementById("list").innerHTML = str;

    // store the innerHtml of element with "list" id
    listData = str;
  } catch (error) {
    console.log(error);
  }
}

// get search input element
const searchInput = document.getElementById("search-input");

// when someone will change input data
searchInput.addEventListener("input", () => {
  document.getElementById("list").innerHTML = listData;

  // to get the latest input value
  const searchValue = searchInput.value;

  // get all elements with class name "data". This will give us all cells which contains data
  const elements = document.getElementsByClassName("data");

  // Now, for each cell, write function, which will highlight the search value in given cell
  for (const cell of elements) {
    highlightText(cell, searchValue);
  }
});

function highlightText(element, searchvalue) {
  // get the innerhtml of given cell
  let innerHtml = element.innerHTML;

  // find the search value in innerHTML
  const index = innerHtml.toLowerCase().indexOf(searchvalue);

  // if search value found
  if (index >= 0) {
    // then add <span> tag around the found data
    // added highlight class in html file
    innerHtml =
      innerHtml.substring(0, index) +
      "<span class=highlight>" +
      innerHtml.substring(index, index + searchvalue.length) +
      "</span>" +
      innerHtml.substring(index + searchvalue.length);
  }

  // replace the innerHtml with new innerHtml
  element.innerHTML = innerHtml;

}

displayData();
