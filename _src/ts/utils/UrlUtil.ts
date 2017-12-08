export class UrlUtil {

    /**
     * you can get filename from url.
     * @param hasExtension 
     */
    public static getFileName(url: string, hasExtension: boolean = true) {
        if (hasExtension) {
            return url.match(".+/(.+?)([\?#;].*)?$")[1];
        }
        else {
            return url.match(".+/(.+?)\.[a-z]+([\?#;].*)?$")[1];
        }
    }

}