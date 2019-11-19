import { get } from 'dotty';
import classnames from 'classnames';
import SanityMuxPlayer from 'sanity-mux-player';
import { urlFor, aspectRatioForImage, calcDimensions } from '../lib/util';

class MediaPlayer extends React.Component {

  render() {
    let {
      image,
      width,
      height,
      className,
      activeClassName,
      inactiveClassName,
      onClick,
      isActive,
      shouldLoadVideo,
      shouldPlayVideo
    } = this.props;

    if (typeof window === 'undefined') {
      return <div />
    }

    /*
      For tall images, adjust the sizing
    */
    const { windowHeight } = calcDimensions();
    const aspectRatio = aspectRatioForImage(image);
    if (aspectRatio < 1) {
      height = Math.min(height, Math.floor(windowHeight * 0.55))
      width = height * aspectRatio
    }

    return (
      image.videoColor ? (
        <div
          className={ classnames('lol', className, { 'media--active': isActive } ) }
          onClick={ onClick }
        >
          <SanityMuxPlayer
            assetDocument={get(image, 'videoMono.asset') || get(image, 'videoColor.asset')}
            autoload={ shouldLoadVideo }
            autoplay={ this.props.isPlaying && Boolean( image.videoMono ) }
            className={ classnames('mediaplayer', inactiveClassName, {
              'mock--monotone': !Boolean( image.videoMono )
            }) }
            loop={true}
            muted={true}
            showControls={false}
            height={ height }
            width={ width }
            style={{ height: '100%'}}
          />
          <SanityMuxPlayer
            assetDocument={get(image, 'videoColor.asset')}
            autoload={shouldLoadVideo}
            autoplay={ this.props.isPlaying }
            className={ classnames( 'mediaplayer', activeClassName) }
            loop={true}
            muted={true}
            showControls={false}
            style={{ opacity: isActive ? 1 : 0, height: '100%'}}
            height={ height }
            width={ width }
          />
        </div>
      ) : (
        <div
          className={ classnames('lol', className, { 'media--active': isActive } ) }
          onClick={ onClick }
        >
          <img
            key={ get(image,'imageMono._id') || 'abc123'}
            className={ classnames('image', inactiveClassName, {
              'mock--monotone': !Boolean( image.imageMono )
            }) }
            src={ urlFor(image.imageMono, width) || urlFor(image.imageColor, width) }
            style={{
              width,
              height
            }}
          />
          <img
            key={ get(image,'imageColor._id') || 'xyz456'}
            className={ classnames('image', activeClassName) }
            src={ urlFor(image.imageColor, width) }
            style={{
              width,
              height,
              opacity: isActive ? 1 : 0
            }}
          />
        </div>
      )
    )
  }
}

export default MediaPlayer;
