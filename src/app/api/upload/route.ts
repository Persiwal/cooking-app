import cloudinary from '@/libs/cloudinary';

export async function POST(request: Request) {
  if (
    process.env.CLOUDINARY_API_SECRET === undefined ||
    process.env.CLOUDINARY_API_KEY === undefined
  ) {
    throw new Error(
      'Missing CLOUDINARY_API_SECRET or CLOUDINARY_API_KEY environment variables'
    );
  }

  try {
    const timestamp = Math.round(new Date().getTime() / 1000);

    const signature = cloudinary.utils.api_sign_request(
      {
        timestamp: timestamp,
      },
      process.env.CLOUDINARY_API_SECRET
    );

    if (!signature) {
      throw new Error('Failed to sign in to Cloudinary API');
    }

    console.log('signature ', signature);
    const data = await request.formData();
    const file: File | null = data.get('file') as unknown as File;
    const formData = new FormData();
    formData.append('file', file);
    //formData.append('upload_preset', 'ml_default');
    //formData.append('api_key', process.env.CLOUDINARY_API_KEY);
    //formData.append('public_id', String(timestamp));
    //formData.append('timestamp', String(timestamp));
    //formData.append('signature', signature);
    //formData.append('asset_folder', 'home/recipes');

    const uploadResponse = await fetch(
      `https://api.cloudinary.com/v1_1/dhjj8p2uy/image/upload?api_key=${process.env.CLOUDINARY_API_KEY}&timestamp=${timestamp}&signature=${signature}`,
      {
        method: 'POST',
        body: formData,
      }
    );

    console.log(uploadResponse);

    const uploadData = await uploadResponse.json();
    console.log(uploadData);

    return Response.json({ url: uploadData.secure_url }, { status: 201 });
  } catch (error) {
    console.error(error);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
