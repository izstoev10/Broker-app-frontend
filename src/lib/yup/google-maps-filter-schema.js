import * as yup from "yup";

yup.addMethod(yup.number, "biggerThan", function (ref, errorMessage) {
  return this.test(`compare`, errorMessage, function (maxValue) {
    const { parent } = this;
    const minValue = parent[ref];
    if (maxValue <= 0 || maxValue === undefined || minValue === undefined) return true;
    return maxValue > minValue ? true : false;
  });
});

yup.addMethod(yup.number, "smallerThan", function (ref, errorMessage) {
  return this.test(`compare`, errorMessage, function (minValue) {
    const { parent } = this;
    const maxValue = parent[ref];
    if (maxValue <= 0 || maxValue === undefined || minValue === undefined) return true;
    return minValue < maxValue ? true : false;
  });
});

const googleMapsFiltersValidationSchema = yup.object().shape({
  cities: yup.array().min(1, "Полето е задължително"),
  maxRooms: yup
    .number()
    .min(0, "Макс. цена трябва да е позитивно число")
    .biggerThan("minRooms", "Макс. стаи трябва да са повече от Мин стаи"),
  maxSquareMeters: yup
    .number()
    .min(0, "Макс. цена трябва да е позитивно число")
    .biggerThan("minSquareMeters", "Макс. кв. метри трябва да е по-голям от Мин. кв. метри"),
  maxPrice: yup
    .number()
    .min(0, "Макс. цена трябва да е позитивно число")
    .biggerThan("minPrice", "Макс. цена трябва да е по-голяма от Мин. цена"),
  minRooms: yup
    .number()
    .min(0, "Мин. стаи трябва да са позитивно число")
    .smallerThan("maxRooms", "Мин. стаи трябва да са по-малко от Макс стаи"),
  minSquareMeters: yup
    .number()
    .min(0, "Мин. кв. метри трябва да са позитивно число")
    .smallerThan("maxSquareMeters", "Мин. кв. метри трябва да са по-малко от Макс. кв. метри"),
  minPrice: yup
    .number()
    .min(0, "Мин. цена трябва да е позитивно число")
    .smallerThan("maxPrice", "Мин. цена трябва да е по-малка от Макс. цена"),
});

export default googleMapsFiltersValidationSchema;
