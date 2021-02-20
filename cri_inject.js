// Inject button Export to csv

function export_to_csv() {
    let usertable = document.getElementById('userlist-table').children[0];
    let header_elt = usertable.getElementsByTagName('thead')[0];
    let body_elt = usertable.getElementsByTagName('tbody')[0];

    let header_tags = header_elt.getElementsByTagName('th');

    let header = [];

    for (let i = 1; i < header_tags.length; ++i) {
        header.push(header_tags[i]['innerText']);
    }

    let rows = [];

    let data = body_elt.getElementsByTagName('tr');

    for (let i = 0; i < data.length; ++i) {
        let elt = data[i];

        let rdata = elt.getElementsByTagName('td');
        let row = [];

        for (let j = 0; j < rdata.length; ++j) {
            if (j == 0) {
                if(!rdata[0].children[0].checked) break;
                continue;
            }
            row.push(rdata[j]['innerText']);
        }
        rows.push(row);
    }

    let csv = [header.join(',')];
    rows.map((r) => csv.push('\n' + r.join(',')));

    let csv_str = csv.reduce((a, b) => a + b);

    let blob = new Blob([csv_str], { type: "text/csv;" });
    let blobUrl = URL.createObjectURL(blob);

    let link = document.createElement('a');
    link.setAttribute('href', blobUrl);
    link.setAttribute('download', 'export.csv');
    link.click();

}

function add_export_csv_btn() {
    let nav = document.getElementById('userlist-table')
        .parentNode
        .parentNode
        .getElementsByTagName('nav')[0];
    let export_csv_btn = document.createElement('a');
    ['btn', 'btn-outline-success', 'text-sm-center', 'nav-link', 'm-1', 'px-3', 'active'].map(
        (cls) => export_csv_btn.classList.add(cls)
    );
    export_csv_btn.innerHTML =
        '<i class="fas fa-upload" style="margin-right: 5px"></i>Export to Csv'
    ;
    export_csv_btn.addEventListener("click", (event) => {
        export_to_csv(); 
    }, false);
    nav.appendChild(export_csv_btn);
}

function increase_checkbox_size() {
    const style = document.createElement('style');
    style.innerHTML = `
          input[type=checkbox] {
            transform: scale(1.3);
          }
        `;
    document.head.appendChild(style);
}

add_export_csv_btn();
increase_checkbox_size();
