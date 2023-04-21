interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: {
        data: {
            image_url: string | undefined
        }
    };
    url?: string;
    type?: string;
    size: number;
    originFileObj: any;
}

interface FileInfo {
    file: FileItem;
    fileList: FileItem[];
}

export {FileItem, FileInfo};