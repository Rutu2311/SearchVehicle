export interface Entry {
  id?: string,
  date: string,
  from: string,
  imgUrl: string,
  img2Url?: string,
  latlong: string,
  location: string,
  num: string,
  uid: string
}

export interface FilterObj {
  noOfRecords: number,
  vehicleNumber: string
  selectedRegions: string,
  date: string
}
