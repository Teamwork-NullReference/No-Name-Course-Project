"use strict";$(document).ready(function(){$("#first-tab a").click(function(e){e.preventDefault(),$(".profile-tab").addClass("hidden"),$("#prfile-info").removeClass("hidden")}),$("#second-tab a").click(function(e){e.preventDefault(),$(".profile-tab").addClass("hidden"),$("#user-cars").removeClass("hidden")}),$("#third-tab a").click(function(e){e.preventDefault(),$(".profile-tab").addClass("hidden"),$("#user-reviews").removeClass("hidden")}),$("#forth-tab a").click(function(e){e.preventDefault(),$(".profile-tab").addClass("hidden"),$("#user-requests").removeClass("hidden")}),$("#rating-select").change(function(){var a=$("#username").text(),b=$("select option:selected").val();jsonRequester.put("/user/"+a+"/rating",{data:{rating:b}}).then(function(){location.reload()}).catch(function(a){console.log(a)})})});