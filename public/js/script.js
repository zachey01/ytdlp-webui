$(document).ready(function () {
  function displayUrl(res) {
    let downloadContainer = document.getElementById("downloadContainer");
    downloadContainer.innerHTML = `<a href="${res}" download><button class="btn btn-primary">Download</button></a><br><br>
    <video src="${res}" controls class="video-player"></video>
    `;

    $(videoPlayer).attr("controls", "true");
    $(videoPlayer).attr("class", "video-player");

    videoPlayer.src = res;
  }

  $("form").submit(function (event) {
    event.preventDefault();

    var url = $("input[name='url']").val();

    if (isValidUrl(url)) {
      $.ajax({
        url: "/download",
        type: "POST",
        data: { url: url },
        success: function (response) {
          displayUrl(response);
          console.log(response);
        },
      });
    } else {
      document.getElementById("error-holder").innerText = "This is not link!";
      setTimeout(function () {
        document.getElementById("error-holder").innerText = "";
      }, 3000);
    }
  });

  function isValidUrl(string) {
    var urlPattern = new RegExp(
      "^(https?:\\/\\/)?" +
        "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" +
        "((\\d{1,3}\\.){3}\\d{1,3}))" +
        "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" +
        "(\\?[;&a-z\\d%_.~+=-]*)?" +
        "(\\#[-a-z\\d_]*)?$",
      "i"
    );

    return urlPattern.test(string);
  }
});
