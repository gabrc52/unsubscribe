/// File storage and retrieval utilities
// TODO: figure out a better way

// https://www.mongodb.com/docs/manual/core/gridfs/
// This is the mongo way to do it, but the cloud mongo only gives us 512 mb

// Instead of Matrix, I could have used Discord

// TODO: handle thumbnails in case wifi is bad and images are large. or compress them when uplodaing

/**
 * Upload a file and get a public URL to access said file.
 */
export async function uploadFile(
  file: Buffer,
  filename: string | undefined,
  contentType: string | undefined
): Promise<string> {
  let url = `${process.env.MATRIX_BASEURL}/_matrix/media/v3/upload`;
  if (filename) {
    url += `?filename=${encodeURIComponent(filename)}`;
  }
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": contentType ?? "application/octet-stream",
      Authorization: `Bearer ${process.env.MATRIX_TOKEN}`,
    },
    body: file,
  });
  if (!response.ok) {
    console.error(`Error uploading ${filename} of ${contentType}:`, response);
    throw Error(`Could not upload file ${filename}`);
  }
  const json = await response.json();
  return getURLFromMXC(json.content_uri);
}

/**
 * Get a URL from a Matrix MXC
 */
function getURLFromMXC(mxc: string): string {
  return `${process.env.MATRIX_BASEURL}/_matrix/media/v3/download/${process.env.MATRIX_HOMESERVER}/${mxc}`;
}
