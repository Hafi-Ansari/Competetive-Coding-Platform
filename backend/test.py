from typing import List
import json
class Solution:
    def fourSum(self, nums: List[int], target: int) -> List[List[int]]:
      return [[-2,-1,1,2],[-2,0,0,2],[-1,0,0,1]]
print(json.dumps(Solution().fourSum(*[[1,0,-1,0,-2,2],0]), separators=(',', ':')))