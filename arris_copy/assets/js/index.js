

$("#add_user").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#update_user").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })


    var request = {
        "url" : `http://localhost:3000/api/users/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
    })

})

if(window.location.pathname == "/"){
    $ondelete = $(".table tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3000/api/users/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}


// function to caluculate total experience
function calculateTotalExperience() {
    // Get values from previous and Arris experience fields
    var previousExperience = parseFloat(document.getElementById('previousExperience').value) || 0;
    var arrisExperience = parseFloat(document.getElementById('arrisExperience').value) || 0;

    // Calculate total experience
    var totalExperience = previousExperience + arrisExperience;

    // Display total experience in the totalExperience field
    document.getElementById('totalExperience').value = totalExperience;
}




























// Get the modal
var modal = document.getElementById('myModal');

// Get the image and insert it inside the modal
var img = document.getElementById('img1');
var modalImg = document.getElementById('modalImg');
img.onclick = function () {
    modal.style.display = 'block';
    modalImg.src = this.src;
};

// Get the <span> element that closes the modal
var span = document.getElementsByClassName('close')[0];

// When the user clicks on <span> (x), close the modal
function closeModal() {
    modal.style.display = 'none';
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};

















