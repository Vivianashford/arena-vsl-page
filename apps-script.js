function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var folderName = data.companyName ? data.companyName + " - " + data.contactName : data.contactName || "Unknown";
    
    var parent = getOrCreateFolder("Arena Client Documents", null);
    var clientFolder = getOrCreateFolder(folderName, parent);
    
    var blob = Utilities.newBlob(Utilities.base64Decode(data.fileData), data.fileType || "application/octet-stream", data.companyName + " - " + data.category + " - " + data.fileName);
    var file = clientFolder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    
    if (data.contactId) {
      UrlFetchApp.fetch("https://services.leadconnectorhq.com/contacts/" + data.contactId + "/notes", {
        method: "post",
        headers: {"Authorization": "Bearer pit-8064b881-a2c3-4999-a1e3-5f85f9689002", "Version": "2021-07-28", "Content-Type": "application/json"},
        payload: JSON.stringify({body: "Document Uploaded\nFile: " + file.getName() + "\nCategory: " + data.category + "\nDrive: " + file.getUrl()}),
        muteHttpExceptions: true
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({success: true, fileUrl: file.getUrl(), fileId: file.getId(), folderName: folderName})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: err.message})).setMimeType(ContentService.MimeType.JSON);
  }
}

function getOrCreateFolder(name, parent) {
  var search = parent ? parent.getFoldersByName(name) : DriveApp.getFoldersByName(name);
  return search.hasNext() ? search.next() : (parent ? parent.createFolder(name) : DriveApp.createFolder(name));
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({status: "ok"})).setMimeType(ContentService.MimeType.JSON);
}
