function Course(title, instructor, image) {
    this.title = title;
    this.instructor = instructor;
    this.image = image;
}

//UI constructor

function UI() {}

UI.prototype.addCourseToList = function (course) {
    const list = document.querySelector('#course-list');
    var html = `
    
    <tr>
        <td> <img src="${course.image}"  style="max-width: 300px;"></td>
        <td> ${course.title} </td>
        <td> ${course.instructor}</td>
        <td> <a href="#" class="btn btn-danger btn-sm delete">Delete</a></td>
    </tr>
    `;

    list.innerHTML += html; // direkt "=" kullanma öyle kullanırsak var olan elementleri silip onların yerine sadece 1 tane yazdığımız gözükür. 
}

UI.prototype.clearControls = function () {

    document.querySelector('#title').value = "";

    document.querySelector('#instructor').value = "";

    document.querySelector('#image').value = "";

}

UI.prototype.deleteCourse = function (element) {
    if (element.classList.contains('delete')) {
        //eğer element'imizin classlistinde 'delete' class'ı varsa if'e gir ve kodları çalıştır.
        element.parentElement.parentElement.remove();
        //butonun parent elementi -> td, td'nin parent elementi ->tr. biz tr'yi silmek istediğimiz için 2 parent elementine çıktık ve sildik.

    }
}

UI.prototype.showAlert = function (message, type) {
    var html = `
        <div class="alert alert-${type}">
            ${message} 
        </div>    
    `;

    const row = document.querySelector('.row');
    //beforeBegin ile vereceğimiz uyarıları row etiketinin üst kısmında yer alacak
    row.insertAdjacentHTML('beforeBegin', html);
    //beforeBegin,afterBegin,beforeEnd,afterEnd


    //uyarı 3 saniye sonra kendiliğinden sonlansın
    setTimeout(() => {
        document.querySelector('.alert').remove();
    }, 3000)

}


document.getElementById('new-course').addEventListener('submit', function (e) {

    const title = document.querySelector('#title').value;

    const instructor = document.querySelector('#instructor').value;

    const image = document.querySelector('#image').value;

    //create object

    const course = new Course(title, instructor, image);

    //create UI
    const ui = new UI();

    if (title === "" || instructor === "" || image === "") {
        ui.showAlert("Please complete the all forms", "warning");
    } else {
        //show on the uı
        ui.addCourseToList(course);
        ui.showAlert("The NFT has been added", "success");

        //clear inputs
        ui.clearControls();

    }

    e.preventDefault();

});

document.getElementById('course-list').addEventListener('click', function (e) {

    const ui = new UI();

    //delete course
    ui.deleteCourse(e.target);


    ui.showAlert("The NFT has been deleted", "danger");

});