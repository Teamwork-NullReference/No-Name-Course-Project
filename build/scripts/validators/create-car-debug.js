"use strinct";$().ready(function(){$("#car-creation-form").validate({rules:{brand:{required:!0},model:{required:!0},year:{required:!0,digits:!0},registrationNumber:{required:!0,minlength:6},hp:{digits:!0},fuel:{required:!0,equalTo:"Бензин"},distance:{digits:!0},perDay:{required:!0,digits:!0,min:0},perWeek:{digits:!0,min:0},age:{digits:!0,min:18},experience:{digits:!0,min:0},rentalPeriod:{digits:!0,min:1},startDate:{date:!0,required:!0},endDate:{date:!0,required:!0}},messages:{brand:"Моля въведете бранд",model:"Моля въведете модел",year:"Моля въведете година на производство",registrationNumber:"Моля въведене регистрационен номер с минимална дължина 6 символа",hp:"Мощноста трябва да съдържа само цифри",fuel:"Горивото трябва да бъде едно от следните Бензин, Дизел, Газ, Електричество",distance:"Пробегът трябва да съдържа само цифри",perDay:"Минималната цена на ден трябва да бъде положително число",perWeek:"Минималната цена на седмица трябва да бъде положително число",age:"Минималната възраст трябва да бъде над 18 год.",experience:"Шофьорски стаж трябва да бъде положително число",rentalPeriod:"Минимални дни на наемане трябва да бъде положително число",startDate:"Начална и крайна дата трябва да бъдат въведени",endDate:"Крайна дата трябва да бъде въведена"}})});