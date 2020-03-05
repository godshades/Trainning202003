//format date 

$('.format-date').datepicker({
    format: "dd/mm/yyyy"
});

//validate
$("#form-search").validate({
    rules: {
        addressVal: {

            maxlength: 250,
        },
        nameVal: {

            maxlength: 250
        },
        ageVal: {
            min: 1,
            max: 100
        },


    },
    messages: {
        addressVal: {

            maxlength: "Không nhập quá 250 ký tự",
        },
        nameVal: {

            maxlength: "Không nhập quá 250 ký tự"
        },
        ageVal: {
            min: "Độ tuổi từ 1 -> 100",
            max: "Độ tuổi từ 1 -> 100",
            number: "Hãy nhập số"
        },
    }
});




//xử lý

let regular_date = /(((0|1)[0-9]|2[0-9]|3[0-1])\/(0[1-9]|1[0-2])\/((19|20)\d\d))$/;
let regular_email = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2, 4})+$/;
let regular_number = /^[0-9]*$/;

$("#typeSearch").change(function () {
    $(".typeSearch input").val("");
    let selectValue = $(this).val();
    //console.log(selectValue);
    $(".typeSearch").removeClass("show");
    $(".typeSearch").addClass("hide");
    $(`#${selectValue}`).removeClass("hide");
    $(`#${selectValue}`).addClass("show");

});
let empGender
$("#gender>label").click(function () {
    let textGender = $(this).text();
    //console.log(textGender)
    if (textGender == "Nam") {
        empGender = true;
    } else empGender = false;

    //console.log(empGender)
});

function search() {
    let empName = $("input[name=nameVal]").val();
    let startDate = $("input[name=startDate]").val();
    let endDate = $("input[name=endDate]").val();
    let empAddress = $("input[name=addressVal]").val();
    let empAge = $("input[name=ageVal]").val();

    if (regular_date.test(startDate) && regular_date.test(endDate) || startDate == "" && endDate == "") {
        $("#birthday> label.error").text("")
        $.ajax({
            type: "post",
            url: "/Home/_GetList",
            data: {
                empName: empName,
                startDate: startDate,
                endDate: endDate,
                empGender: empGender,
                empAddress: empAddress,
                empAge: empAge,
            },
            success: function (response) {

                //console.log(response)
                $("#tableList").html(response)
            },
            error: function (xhr) {
                console.log(xhr);
            }
        })
    } else {
        $("#birthday> label.error").text("Định dạng không hợp lệ")

    }
}
$("#sendSearch").click(function (e) {
    e.preventDefault();
    search();


});
//Thêm

let tdId;
let tdName;
let tdBirthday;
let tdGender;
let tdAddress;
let tdEmail;
let tdPhone;


let validateId;
let validateName;
let validateBirthday;
let validateGender;
let validateAddress;
let validateEmail;
let validatePhone;


//-------------------
function addEmp() {
    // Lấy giá trị nhập
    tdId = $(".row-add .td-id").text();
    tdName = $(".row-add .td-name").text();
    tdBirthday = $(".row-add .td-birthday").text();
    tdGender = $(".row-add .td-gender").text().toUpperCase();
    tdAddress = $(".row-add .td-address").text();
    tdEmail = $(".row-add .td-email").text();
    tdPhone = $(".row-add .td-phone").text();
    //----------------
    if (tdId == "" || tdName == "" || tdBirthday == "" || tdGender == "" || tdAddress == "" || tdEmail == "" || tdPhone == "") {
        alert("Vui lòng nhập đầy đủ thông tin");
    } else {

        //convert date :
        let dateArray = tdBirthday.split("/");
        let newTdBirthday = dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2];
        //---------

        //convert gender :

        let data = {
            ID: tdId,
            NAME: tdName,
            BIRTHDAY: newTdBirthday,
            ADDRESS: tdAddress,
            EMAIL: tdEmail,
            PHONE: tdPhone,
        }
        //-------------
        $.ajax({
            url: 'Home/AddEmployee',
            type: 'POST',
            data: {
                data: data,
                gender: tdGender
            },
            success: function (res) {
                // console.log(res)
                $("#tableList").html(res)
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    }

}
let checkId;
//---------------------
$("#addList").click(function () {
    $(".td-edit").attr("contenteditable", "false");
    if ($(".row-add").length >= 1) {
        alert("Vui lòng nhập vào ô trống");
    } else {
        let htmlRow = $(".row-list").html();
        //console.log(htmlRow);
        $("#tableList tbody").append(`#<tr class="row-add" id="row-delete">${htmlRow}</tr>`)
    }
    $(".row-add .td-edit").attr("contenteditable", "true");
    checkId = "row-add"

});
//------------------------


//Lưu

//----------------------------------    -


//Sửa
let editId

$(document).on("click", ".editList", function () {
    if ($(".row-add").length >= 1) {
        $(".row-add").remove();
    }
    $('.td-edit').attr("contenteditable", "false");
    editId = $(this).data("id");
    checkId = editId;
    //console.log(editId)
    $(`#${editId}>.td-edit`).attr("contenteditable", "true");
});



function editEmp() {

    if (tdId == "" || tdName == "" || tdBirthday == "" || tdGender == "" || tdAddress == "" || tdEmail == "" || tdPhone == "") {
        alert("Vui lòng nhập đầy đủ thông tin");
    } else {
        tdId = editId;
        tdName = $(`#${editId}>.td-name`).text();
        tdBirthday = $(`#${editId}>.td-birthday`).text();
        tdGender = $(`#${editId}>.td-gender`).text().toUpperCase();
        tdAddress = $(`#${editId}>.td-address`).text();
        // console.log(tdAddress);
        tdEmail = $(`#${editId}>.td-email`).text();
        tdPhone = $(`#${editId}>.td-phone`).text();

        //convert date :
        let dateArray = tdBirthday.split("/");
        let newTdBirthday = dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2];
        //---------
        //convert gender :

        let data = {
            ID: tdId,
            NAME: tdName,
            BIRTHDAY: newTdBirthday,
            ADDRESS: tdAddress,
            EMAIL: tdEmail,
            PHONE: tdPhone,
        }
        // console.log(data)
        //-------------
        $.ajax({
            url: 'Home/EditEmployee',
            type: 'POST',
            data: {
                data: data,
                gender: tdGender
            },
            success: function (res) {
                // console.log(res)
                $("#tableList").html(res)
            },
            error: function (e) {
                console.log(e.message);
            }
        });
    }
}

//-----------------------------
function validateAll() {
    validateId = $(`#${checkId} .td-id`).text();
    // console.log("validateAll -> validateId", validateId)
    validateName = $(`#${checkId} .td-name`).text();
    // console.log("validateAll -> validateName", validateName)
    validateBirthday = $(`#${checkId} .td-birthday`).text();
    // console.log("validateAll -> validateBirthday", validateBirthday)
    validateGender = $(`#${checkId} .td-gender`).text().toUpperCase();
    // console.log("validateAll -> validateGender", validateGender)
    validateAddress = $(`#${checkId} .td-address`).text();
    // console.log("validateAll -> validateAddress", validateAddress)
    validateEmail = $(`#${checkId} .td-email`).text();
    // console.log("validateAll -> validateEmail", validateEmail)
    validatePhone = $(`#${checkId} .td-phone`).text();
    // console.log("validateAll -> validatePhone", validatePhone)
    if (validateId.length > 10) {
        toastr.error('Mã nhân viên không quá 10 ký tự');
        return false;
    } else
        if (validateName.length > 250) {
            toastr.error('Mã nhân viên không quá 250 ký tự');
            return false;

        } else
            if (!regular_date.test(validateBirthday)) {
                toastr.error('Ngày sinh không đúng định dạng');
                return false;

            } else
                if (validateGender != "NAM" && validateGender != "NỮ") {
                    toastr.error('Giới tính phải là nam hoặc nữ');
                    return false;

                } else
                    if (validateAddress.length > 250 || validateAddress == "") {
                        toastr.error('Địa chỉ không được bỏ trống và không quá 250 ký tự');
                        return false;

                    } else

                        if (!regular_email.test(validateEmail) == false || validateEmail.length > 250) {
                            toastr.error('Email không hợp lệ');
                            return false;

                        } else
                            if (regular_number.test(validatePhone) == false || validatePhone.length > 15) {
                                toastr.error('Số điện thoại không hợp lệ');
                                return false;

                            } else



                                return true;

}


$(document).on("click", "#saveList", function () {
    let validate = validateAll();
    if (!validate) {

    } else
        if ($(".row-add").length == 1) {
            // console.log($(".row-add").length)
            addEmp();
        } else editEmp();

})

$(document).on("click", ".deleteList", function () {
    let deleteId = $(this).data("id");
    //console.log(deleteId)
    let confirmation = confirm("Bạn có chắc chắn muốn xóa ?");
    if (confirmation) {
        $.ajax({
            url: 'Home/DeleteEmployee',
            type: 'POST',
            data: {
                deleteId: deleteId
            },
            success: function () {




                $(`#${deleteId}`).remove();

                alert("Xóa thành công");
            },
            error: function (e) {
                console.log(e.message);
            }
        });


    }
})