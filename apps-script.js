function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var folderName = data.companyName ? data.companyName + " - " + data.contactName : data.contactName || "Unknown";
    
    // Use Drive API v3 instead of DriveApp (bypasses Workspace restriction)
    var token = ScriptApp.getOAuthToken();
    
    // Find or create "Arena Client Documents" parent folder
    var parentId = findOrCreateFolder("Arena Client Documents", "root", token);
    
    // Find or create client folder
    var clientFolderId = findOrCreateFolder(folderName, parentId, token);
    
    // Upload file
    var fileName = data.companyName + " - " + data.category + " - " + data.fileName;
    var fileBytes = Utilities.base64Decode(data.fileData);
    var boundary = "arena_upload_boundary";
    var metadata = JSON.stringify({
      name: fileName,
      parents: [clientFolderId]
    });
    
    var payload = "--" + boundary + "\r\n" +
      "Content-Type: application/json; charset=UTF-8\r\n\r\n" +
      metadata + "\r\n" +
      "--" + boundary + "\r\n" +
      "Content-Type: " + (data.fileType || "application/octet-stream") + "\r\n" +
      "Content-Transfer-Encoding: base64\r\n\r\n" +
      data.fileData + "\r\n" +
      "--" + boundary + "--";
    
    var uploadResp = UrlFetchApp.fetch("https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart&fields=id,name,webViewLink", {
      method: "post",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "multipart/related; boundary=" + boundary
      },
      payload: payload,
      muteHttpExceptions: true
    });
    
    var fileData2 = JSON.parse(uploadResp.getContentText());
    var fileUrl = fileData2.webViewLink || ("https://drive.google.com/file/d/" + fileData2.id + "/view");
    
    // Set sharing to anyone with link
    UrlFetchApp.fetch("https://www.googleapis.com/drive/v3/files/" + fileData2.id + "/permissions", {
      method: "post",
      headers: {
        "Authorization": "Bearer " + token,
        "Content-Type": "application/json"
      },
      payload: JSON.stringify({role: "reader", type: "anyone"}),
      muteHttpExceptions: true
    });
    
    // Add note to GHL contact
    if (data.contactId) {
      UrlFetchApp.fetch("https://services.leadconnectorhq.com/contacts/" + data.contactId + "/notes", {
        method: "post",
        headers: {"Authorization": "Bearer pit-8064b881-a2c3-4999-a1e3-5f85f9689002", "Version": "2021-07-28", "Content-Type": "application/json"},
        payload: JSON.stringify({body: "Document Uploaded\nFile: " + fileName + "\nCategory: " + data.category + "\nDrive: " + fileUrl}),
        muteHttpExceptions: true
      });
    }
    
    return ContentService.createTextOutput(JSON.stringify({success: true, fileUrl: fileUrl, fileId: fileData2.id, folderName: folderName})).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({success: false, error: err.message})).setMimeType(ContentService.MimeType.JSON);
  }
}

function findOrCreateFolder(name, parentId, token) {
  var query = "mimeType='application/vnd.google-apps.folder' and name='" + name.replace(/'/g, "\\'") + "' and '" + parentId + "' in parents and trashed=false";
  var searchResp = UrlFetchApp.fetch("https://www.googleapis.com/drive/v3/files?q=" + encodeURIComponent(query) + "&fields=files(id,name)", {
    headers: {"Authorization": "Bearer " + token},
    muteHttpExceptions: true
  });
  var results = JSON.parse(searchResp.getContentText());
  if (results.files && results.files.length > 0) {
    return results.files[0].id;
  }
  
  var createResp = UrlFetchApp.fetch("https://www.googleapis.com/drive/v3/files?fields=id,name", {
    method: "post",
    headers: {"Authorization": "Bearer " + token, "Content-Type": "application/json"},
    payload: JSON.stringify({name: name, mimeType: "application/vnd.google-apps.folder", parents: [parentId]}),
    muteHttpExceptions: true
  });
  return JSON.parse(createResp.getContentText()).id;
}

function doGet() {
  return ContentService.createTextOutput(JSON.stringify({status: "ok"})).setMimeType(ContentService.MimeType.JSON);
}
