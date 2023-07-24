class ActionStatement {
  public async Main() {}

  public async CommentRemoved() {
    const response = "We noticed [someone] deleted his comment";
    return response;
  }
  public async CommentAdded() {
    const response = `Theres a new comment from [someone], what would you like to do`;
    return response;
  }
  public async Liked() {
    const response = `[somone] liked your account. Seems you are making waves`;
    return response;
  }
}
