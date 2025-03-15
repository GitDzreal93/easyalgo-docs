import { createBrowserClient } from '@supabase/ssr';

interface UploadResult {
  url?: string;
  error?: string;
}

export async function uploadFile(file: File | FormData): Promise<UploadResult> {
  try {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    );
    
    // 如果是 FormData，获取文件
    const actualFile = file instanceof FormData ? file.get('file') as File : file;
    
    // 生成唯一的文件名
    const fileExt = actualFile.name.split('.').pop();
    const fileName = `${Math.random().toString(36).substring(2)}${Date.now()}.${fileExt}`;
    const filePath = `public/${fileName}`;

    // 上传文件到 Supabase Storage
    const { data, error: uploadError } = await supabase.storage
      .from('images')
      .upload(filePath, actualFile);

    if (uploadError) {
      return { error: uploadError.message };
    }

    // 获取文件的公共 URL
    const { data: { publicUrl } } = supabase.storage
      .from('images')
      .getPublicUrl(filePath);

    return { url: publicUrl };
  } catch (error) {
    console.error('Error uploading file:', error);
    return { error: '文件上传失败' };
  }
} 