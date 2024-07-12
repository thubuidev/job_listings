main();

let dataList;
let dataFilter = [];

async function main() {
  dataList = await getData();

  const jobList = document.querySelector("#job-list");

  for (const i of dataList) {
    jobList.innerHTML += `<div class="job-item-wrapper">
                  <div class="job-item-inner">
                    <div class="job-img">
                      <img src=${i.logo} alt=${i.company} />
                    </div>
                    <div class="job-desc">
                      <div class='job-desc-inner'>
                        <div class='company-name'>
                          ${i.company}
                        </div>
                        <div class='tag-list'>
                          ${
                            i.new
                              ? `<button class="tag-title title-new">NEWS</button>`
                              : ``
                          }
                          ${
                            i.featured
                              ? `<button class="tag-title title-feauture">FEATURED</button>`
                              : ``
                          }
                        </div>
                      </div>

                      <div class='position-info'>
                        ${i.position}
                      </div>

                      <div class='info-optional'>
                        <span>${i.postedAt}</span>
                        <span>${i.contract}</span>
                        <span>${i.location}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div class='languages'>
                    <button class="tag-btn" data-role="${
                      i.role
                    }" onclick="getValueFilter('${i.role}')">${i.role}</button>
                     <button class="tag-btn" data-level="${
                       i.level
                     }" onclick="getValueFilter('${i.level}')">${
      i.level
    }</button>
                    ${i.languages
                      .map(
                        (e) =>
                          `<button class="tag-btn" data-languages="${e}" onclick="getValueFilter('${e}')">${e}</button>`
                      )
                      .join("")}
                    ${
                      i.tools?.length
                        ? i.tools
                            ?.map(
                              (t) =>
                                `<button class="tag-btn" data-tools="${t}" onclick="getValueFilter('${t}')">${t}</button>`
                            )
                            .join("")
                        : ""
                    } 
                  </div>
                </div>`;
  }
}

async function getData() {
  const res = await fetch("./data.json");
  const data = await res.json();

  return data;
}

function getValueFilter(value) {
  if (value && !dataFilter?.includes(value)) {
    dataFilter.push(value);

    const filterElement = document.querySelector("#job-filter");

    filterElement.innerHTML += `<div class="job-filter-item" id="${value}">
            <p class="filter-name">${value}</p>
            <div class="remove-icon" onclick="removeElement('${value}')">
              <img src="./images/icon-remove.svg" alt="remove-icon" />
            </div>
        </div>`;
  }
}

function removeElement(value) {
  dataFilter = dataFilter?.filter((i) => i !== value);

  const element = document.getElementById(value);
  element.remove();
}

function clearFilter() {
  dataFilter = [];
  const jobFilterItems = document.getElementsByClassName("job-filter-item");

  while (jobFilterItems[0]) {
    jobFilterItems[0].parentNode.removeChild(jobFilterItems[0]);
  }
}
