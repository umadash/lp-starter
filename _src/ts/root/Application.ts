var $ = require('jquery');
require('jquery-lazyload');

import { DeviceUtil } from '../utils/DeviceUtil';
import { UrlUtil } from '../utils/UrlUtil';

export class Application {
    // --------------------------------------------------
    //
    // CONSTRUCTOR
    //
    // --------------------------------------------------
    constructor() {
    }
    
    // --------------------------------------------------
    //
    // METHOD
    //
    // -------------------------------------------------- 
    public run(): void {
        this.replaceImage();
    }

    private replaceImage(): void {
        const $images = $('img.lazy');
    
        // モバイルかどうかの判断
        const isMobile = DeviceUtil.isMobile();
    
        $images.each((index, elm) => {
            const $elm = $(elm);
        
            // オリジナルのソース
            const origin = $elm.attr('data-original');
        
            // ファイル名(拡張子なし)
            const originFileName = UrlUtil.getFileName(origin, false);
        
            // 変更するファイル名
            let changedFileName = originFileName;
        
            // モバイル用に画像を切り替える必要があるか
            const hasMobileImg = ($elm.attr('mobile') != undefined);
            if (hasMobileImg && isMobile) {
                changedFileName += '-mobile';
            }
        
            // 高解像度ディスプレイ用画像
            const hasRetina = ($elm.attr('2x') != undefined);
            if (hasRetina) {
                changedFileName += '@2x';
            }
        
            // オリジナルのソースを書き換える
            const src = origin.replace(originFileName, changedFileName);
            $elm.attr('data-original', src);
        });
    
        $images.lazyload({
            threshold: 0,
            failure_limit: 1,
            effect: "show",
            event: "scroll",
            attribute: "data-original",
            skip_invisible: true,
            appear: null,
            load: function() {
                const $img = $(this);
                const hasRetina = ($img.attr('2x') != undefined);
                let iw = $img.width();
                let ih = $img.height();
                if (hasRetina) {
                    iw = Math.floor(iw * .5);
                    ih = Math.floor(ih * .5);
                }

                $img.attr({
                    width: iw,
                    height: ih
                });
            }
        });
    }
    
    // --------------------------------------------------
    
    // MEMBER
    
    // --------------------------------------------------
}


