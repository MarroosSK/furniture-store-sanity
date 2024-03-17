export interface ProductProps {
  _id: string;
  _type: string;
  _rev: string;
  _createdAt: string;
  price: number;
  oldprice: number;
  title: string;
  position: string;
  ratings: number;
  description: string;
  brand: string;
  status: string;
  slug: {
    current: string;
    _type: string;
  };
  image: [
    {
      _type: string;
      asset: {
        _ref: string;
        _type: string;
      };
    }
  ];
  category: [
    {
      _key: string;
      _ref: string;
      _type: string;
    }
  ];
  isnew: boolean;
  body: any;
  quantity: number;
}
export interface StoreProductProps {
  _id: string;
  _type: string;
  _rev: string;
  _createdAt: string;
  price: number;
  oldprice: number;
  title: string;
  position: string;
  ratings: number;
  description: string;
  brand: string;
  status: string;
  slug: {
    current: string;
    _type: string;
  };
  image: [
    {
      _type: string;
      asset: {
        _ref: string;
        _type: string;
      };
    }
  ];
  category: [
    {
      _key: string;
      _ref: string;
      _type: string;
    }
  ];
  isnew: boolean;
  body: any;
  quantity: number;
  myQuantity: number;
}

export interface MarqueI {
  title: string;
  subtitle: string;
}

export interface BannerI {
  _id: string;
  image: {
    _type: string;
    asset: {
      _ref: string;
      _type: string;
    };
  };
}

export interface ReviewI {
  _id: string;
  user: string;
  title: string;
  userRating: number;
  text: string;
}

export interface CategoryI {
  _id: string;
  title: string;
  description: string;
}
