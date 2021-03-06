// Universal Subtitles, universalsubtitles.org
// 
// Copyright (C) 2010 Participatory Culture Foundation
// 
// This program is free software: you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
// 
// This program is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
// 
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see 
// http://www.gnu.org/licenses/agpl-3.0.html.

/**
 * @fileoverview A video player with custom video controls, to be used 
 *     particularly for completing subtitling work.
 */

goog.provide('unisubs.player.ControlledVideoPlayer');

/**
 *
 * @constructor
 * @param {unisubs.player.AbstractVideoPlayer} videoPlayer
 */
unisubs.player.ControlledVideoPlayer = function(videoPlayer) {
    goog.ui.Component.call(this);
    this.videoPlayer_ = videoPlayer;
    this.controls_ = null;
};
goog.inherits(unisubs.player.ControlledVideoPlayer, goog.ui.Component);

unisubs.player.ControlledVideoPlayer.prototype.createDom = function() {
    unisubs.player.ControlledVideoPlayer.superClass_.createDom.call(this);
    this.addChild(this.videoPlayer_, true);
    if ( this.videoPlayer_.isChromeless()){
        this.controls_ = new unisubs.controls.VideoControls(this.videoPlayer_);
        this.addChild(this.controls_, true);    
    }else{
        // dummy object  
        this.controls_ = function (){};
    }
};

unisubs.player.ControlledVideoPlayer.prototype.getPlayer = function() {
    return this.videoPlayer_;
};
