import ratelimit from "express-rate-limit";

const limiter = ratelimit({
  windowMs: 5 * 60 * 1000,
  max: 250,
  message: {
    status: 429,
    error: "too many request",
  },
});

export default limiter;
