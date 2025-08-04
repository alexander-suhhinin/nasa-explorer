import NodeCache from 'node-cache';

const cache = new NodeCache({
  stdTTL: 60 * 5, // default 5 min TTL
  checkperiod: 60, // check expired keys every 1 min
});

export default cache;
