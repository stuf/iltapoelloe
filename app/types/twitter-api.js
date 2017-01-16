// @flow
export type FilterLevel = 'none' | 'low' | 'medium';

/**
 * Entities' types
 */
export type HashTag = {
  indices: Array<number>,
  text: string
};

export type Media = {
  display_url: string,
  expanded_url: string,
  id: number,
  id_str: string,
  indices: Array<number>,
  media_url: string,
  media_url_https: string,
  sizes: MediaSizes,
  source_status_id: number,
  source_status_id_str: string,
  type: string,
  url: string
};

export type Url = {
  display_url: string,
  expanded_url: string,
  indices: Array<number>,
  url: string
};

export type UserMention = {
  id: number,
  id_str: string,
  indices: Array<number>,
  name: string,
  screen_name: string
};

/**
 * Media-related types
 */
export type MediaSize = {
  h: number,
  resize: string,
  w: number
};

export type MediaSizes = {
  thumb: MediaSize,
  large: MediaSize,
  medium: MediaSize,
  small: MediaSize
};

/**
 * Tweet-related types
 *
 * Use 'string' as a fallback for types that have not been specified here.
 * The specified types can be used for reference on possible API values.
 */
type CoordinateType = 'Polygon' | 'Point' | 'LinearRing' | 'LineString' | string;

export type Point = Array<number>;

export type Coordinate<T, U> = {
  coordinates: Array<T>,
  type: U
};

export type BoundingBox = Array<Point>;

export type Coordinates = Coordinate<Point, CoordinateType>;

/**
 * Place-related types
 *
 * Use 'string' as a fallback for types that have not been specified here.
 * The specified types can be used for reference on possible API values.
 */
export type BoundingBoxPlace = Coordinate<Array<BoundingBox>, CoordinateType>;

export type PlaceType = 'neighborhood' | 'city' | 'town' | string;

export type Entities = {
  hashtags: Array<HashTag>,
  media: Array<Media>,
  urls: Array<Url>,
  user_mentions: Array<UserMention>
};

/**
 * Use 'string' as a fallback for types that have not been specified here.
 * The specified types can be used for reference on possible API values.
 */
export type PlaceAttributes = {
  street_address?: string,
  locality?: string,
  region?: string,
  iso?: string,
  postal_code?: string,
  phone?: string,
  twitter?: string,
  url?: string,
  'app:id'?: string,

  // Additional fallback for everything else
  [key: string]: string
};

/**
 * Place type
 */
export type Place = {
  attributes: PlaceAttributes,
  bounding_box: BoundingBoxPlace,
  country: string,
  country_code: string,
  full_name: string,
  id: string,
  name: string,
  place_type: PlaceType,
  url: string
};

export type User = {
  contributors_enabled: boolean,
  created_at: string,
  default_profile: boolean,
  default_profile_image: boolean,
  description?: string,
  entities: Entities,
  favourites_count: number,
  follow_request_sent?: boolean,
  followers_count: number,
  friends_count: number,
  geo_enabled: boolean,
  id: number,
  id_str: string,
  is_translator: boolean,
  lang: string,
  listed_count: number,
  location: string,
  name: string,
  profile_background_color: string,
  profile_background_image_url: string,
  profile_background_image_url_https: string,
  profile_background_tile: boolean,
  profile_banner_url: string,
  profile_image_url: string,
  profile_image_url_https: string,
  profile_link_color: string,
  profile_sidebar_border_color: string,
  profile_sidebar_fill_color: string,
  profile_text_color: string,
  profile_use_background_image: boolean,
  protected: boolean,
  screen_name: string,
  show_all_inline_media: boolean,
  status?: Tweet,
  statuses_count: number,
  time_zone?: string,
  url?: string,
  utc_offset?: number,
  verified: boolean,
  withheld_in_countries: string,
  withheld_scope: string
};

export type Tweet = {
  coordinates: Coordinates,
  created_at: string,
  current_user_retweet?: *,
  entities: Entities,
  favorite_count?: number,
  favorited?: boolean,
  filter_level: FilterLevel,
  id: number,
  id_str: string,
  in_reply_to_screen_name?: string,
  in_reply_to_status_id?: number,
  in_reply_to_status_id_str?: string,
  in_reply_to_user_id?: number,
  in_reply_to_user_id_str?: string,
  lang?: string,
  place: Place,
  possibly_sensitive?: boolean,
  quoted_status_id?: number,
  quoted_status_id_str?: string,
  quoted_status: *,
  scopes: { [key: string]: * },
  retweet_count: number,
  retweeted: boolean,
  retweeted_status: *,
  source: string,
  text: string,
  truncated: boolean,
  user: User,
  withheld_copyright: boolean,
  withheld_in_countries: Array<string>,
  withheld_scope: string
};
